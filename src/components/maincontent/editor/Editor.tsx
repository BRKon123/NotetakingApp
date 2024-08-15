// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import {
  EditableDivElement,
  createEditableBlock,
  EditableBlockElement,
  EditableSpanElement,
  EditableBulletSpanElement,
  EditableHeaderSpanElement,
} from "../../../utils/editorClasses";
import {
  isValidMarkdownHeading,
  getCurrentNode,
  getCurrentNodeInfo,
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
    const { textBeforeCaret, textAfterCaret, currentSpanNode } =
      getCurrentNodeInfo(); // could use currentBlock, but this seems to manage this for us
    const currentDivNode = currentSpanNode.parentNode as EditableDivElement;

    const currentBlockCleanContent = currentSpanNode.getCleanTextContent(); //text content without the leading zero width space
    console.log("current div node:", currentDivNode);
    console.log(
      "current key pressed:",
      event.key,
      "textBeforeCaret:",
      textBeforeCaret,
      "textAfterCaret:",
      textAfterCaret
    );

    if (event.key === "Enter") {
      //enter key pressed
      event.preventDefault();
      currentDivNode.appendNewEditableDivAfter();
    } else if (event.key === "Backspace" && textBeforeCaret === "\u200B") {
      if (
        currentDivNode instanceof EditableBlockElement ||
        currentSpanNode instanceof EditableBulletSpanElement ||
        currentSpanNode instanceof EditableHeaderSpanElement
      ) {
        if (currentDivNode.parentNode.firstChild === currentDivNode) {
          event.preventDefault(); // if the first editable div do nothing
        } else {
          // merge content from this file in plain text to the previous div
          const previousDivNode =
            currentDivNode.previousSibling as EditableDivElement;
          previousDivNode.content.textContent +=
            currentDivNode.getCleanTextContent();
          currentDivNode.remove();
          previousDivNode.setCaretAtStart();
        }
      } else {
        // handle backspace when it is at end of content of header or bullet
        console.log("converting to editable div since space bad");
        event.preventDefault();
        currentDivNode.convertToEditableBlock(true);
      }
    }

    if (
      lastKeyPressed === "*" && // this needs to be updated
      event.key == " " &&
      currentDivNode instanceof EditableBlockElement && // can't convert is already a bullet
      currentBlockCleanContent === "*" // make sure that it is the start of the line
    ) {
      console.log("Converting to bullet");
      event.preventDefault();
      currentDivNode.replaceWithEditableBullet();
    }

    if (
      lastKeyPressed === "#" && // this needs to be updated
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
