// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import {
  EditableDivElement,
  createEditableBlock,
  createEditableBullet,
  createEditableHeader,
  EditableSpanElement,
} from "../../../utils/editorClasses";
import { isValidMarkdownHeading } from "../../../utils/editorOperations";

//div element to represent idea blocks with span inside for the content

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const currentBlock = useRef<EditableDivElement>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

  const appendNewEditableDivAfter = () => {
    if (currentBlock.current) {
      const newDiv = createEditableBlock();
      currentBlock.current.after(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      newDiv.setCaretAtStart();
    }
  };

  const replaceWithEditableBullet = () => {
    if (currentBlock.current) {
      const newBullet = createEditableBullet();
      currentBlock.current.replaceWith(newBullet);
      currentBlock.current = newBullet;
      newBullet.setCaretAtStart();
    }
  };

  const replaceWithEditableHeader = (headingString: string) => {
    if (currentBlock.current) {
      const newHeader = createEditableHeader(headingString);
      currentBlock.current.replaceWith(newHeader);
      currentBlock.current = newHeader;
      newHeader.setCaretAtStart();
    }
  };

  const addFirstEditableDiv = () => {
    if (containerElement.current) {
      const newDiv = createEditableBlock();
      containerElement.current.appendChild(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      newDiv.setCaretAtStart();
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    const selection = window.getSelection();
    const currentNode = selection?.anchorNode; // could use currentBlock, but this seems to manage this for us

    console.log(
      "node current: ",
      currentNode,
      "current node type: ",
      currentNode instanceof EditableSpanElement
    );

    if (event.key === "Enter") {
      event.preventDefault();
      appendNewEditableDivAfter();
    }

    const currentBlockCleanContent =
      currentBlock.current.content.getCleanTextContent(); //text content without the leading zero width space

    if (
      lastKeyPressed === "*" &&
      event.key == " " &&
      currentBlock.current instanceof EditableDivElement && // can't convert is already a bullet
      currentBlockCleanContent === "*" // make sure that it is the start of the line
    ) {
      console.log("Converting to bullet");
      event.preventDefault();
      replaceWithEditableBullet();
    }

    if (
      lastKeyPressed === "#" &&
      event.key === " " &&
      currentBlock.current instanceof EditableDivElement &&
      isValidMarkdownHeading(currentBlockCleanContent) // check if it is a valid markdown heading
    ) {
      console.log("Converting to header");
      event.preventDefault();
      replaceWithEditableHeader(currentBlockCleanContent);
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
