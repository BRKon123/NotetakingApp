// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import { isEditableDivElement } from "../../../models/editorTypes";
import {
  setCaretAtStart,
  getElementCleanTextContent,
  createEditableDiv,
  createEditableBullet,
} from "../../../utils/editorOperations";

//div element to represent idea blocks with span inside for the content

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const currentBlock = useRef<HTMLDivElement>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

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

  const replaceWithEditableBullet = () => {
    if (currentBlock.current) {
      const newBullet = createEditableBullet();
      currentBlock.current.replaceWith(newBullet);
      currentBlock.current = newBullet;
      setCaretAtStart(newBullet.content);
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
      event.preventDefault();
      replaceWithEditableBullet();
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
