// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import {
  EditableDivElement,
  EditableBulletElement,
  isEditableDivElement,
} from "../../../models/editorTypes";
import {
  createEditableSpan,
  setCaretAtStart,
  getElementCleanTextContent,
} from "../../../utils/editorOperations";

//div element to represent idea blocks with span inside for the content

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const currentBlock = useRef<EditableDivElement>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

  const createEditableDiv = (): EditableDivElement => {
    const newDiv = document.createElement("div") as EditableDivElement;
    newDiv.className = "focus:outline-none";

    const span = createEditableSpan();
    newDiv.appendChild(span);
    newDiv.content = span;

    return newDiv;
  };

  const createEditableBullet = (
    textContent: string = null // the content of the bullet
  ): EditableBulletElement => {
    const newDiv = document.createElement("div") as EditableBulletElement;
    newDiv.className = "focus:outline-none flex items-start";

    const bulletSpan = createEditableSpan("• ", "ml-4");
    const contentSpan = createEditableSpan(textContent);
    newDiv.appendChild(bulletSpan);
    newDiv.appendChild(contentSpan);
    newDiv.bullet = bulletSpan;
    newDiv.content = contentSpan;

    return newDiv;
  };

  const appendNewEditableDivAfter = () => {
    if (currentBlock.current) {
      const newDiv = createEditableDiv();
      currentBlock.current.after(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart(newDiv.content);
    }
  };

  const addFirstEditableDiv = () => {
    if (containerElement.current) {
      const newDiv = createEditableDiv();
      containerElement.current.appendChild(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart(newDiv.content);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      appendNewEditableDivAfter();
    }

    if (
      lastKeyPressed === "*" &&
      event.key == " " &&
      isEditableDivElement(currentBlock.current) && // can't convert is already a bullet
      getElementCleanTextContent(currentBlock.current.content) === "*" // make sure that it is the start of the line
    ) {
      console.log("Converting to bullet");
      const newBullet = createEditableBullet();
      currentBlock.current.replaceWith(newBullet);
      currentBlock.current = newBullet;
    }

    //last thing to do is to set the last key pressed
    setLastKeyPressed(event.key);
  };

  return (
    <div
      ref={containerElement}
      contentEditable={true}
      onKeyDown={handleOnKeyDown}
      className="w-full h-full bg-transparent text-black focus:outline-none"
    ></div>
  );
}

export default Editor;

// <div className="flex items-start">
//     <span className="ml-2 bullet">•</span>
//     <span className="text-gray-800" style="margin-left: 10px;">
//         Quantum laws trump Newtonian laws. This field is what governs the
//         agency of the particle and organizes light into form.
//     </span>
// </div>
