// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import {
  EditableDivElement,
  createEditableBlock,
  EditableBlockElement,
} from "../../../utils/editorClasses";
import {
  isValidMarkdownHeading,
  getCurrentNode,
} from "../../../utils/editorOperations";

//div element to represent idea blocks with span inside for the content

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

  const addFirstEditableDiv = () => {
    if (containerElement.current) {
      const newDiv = createEditableBlock();
      containerElement.current.appendChild(newDiv);
      newDiv.setCaretAtStart();
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    const currentSpanNode = getCurrentNode(); // could use currentBlock, but this seems to manage this for us
    const currentDivNode = currentSpanNode.parentNode as EditableDivElement;

    if (event.key === "Enter") {
      event.preventDefault();
      currentDivNode.appendNewEditableDivAfter();
    }

    const currentBlockCleanContent =
      currentDivNode.content.getCleanTextContent(); //text content without the leading zero width space

    if (
      lastKeyPressed === "*" &&
      event.key == " " &&
      currentDivNode instanceof EditableBlockElement && // can't convert is already a bullet
      currentBlockCleanContent === "*" // make sure that it is the start of the line
    ) {
      console.log("Converting to bullet");
      event.preventDefault();
      currentDivNode.replaceWithEditableBullet();
    }

    if (
      lastKeyPressed === "#" &&
      event.key === " " &&
      currentDivNode instanceof EditableBlockElement &&
      isValidMarkdownHeading(currentBlockCleanContent) // check if it is a valid markdown heading
    ) {
      console.log("Converting to header");
      event.preventDefault();
      currentDivNode.replaceWithEditableHeader(currentBlockCleanContent);
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
