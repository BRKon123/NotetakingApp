// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import {
  EditableDivElement,
  createEditableBlock,
  EditableBlockElement,
  EditableSpanElement,
  EditableContentSpanElement,
  KeyHandler,
  EditableBulletSpanElement,
  EditableHeaderSpanElement,
} from "../../../utils/editorClasses";
import {
  isValidMarkdownHeading,
  getCurrentNode,
  getCurrentNodeInfo,
  isInitialSpanElement,
  isFinalSpanElement,
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
      newDiv.setCaretAtEnd();
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    const { textBeforeCaret, textAfterCaret, currentSpanNode } =
      getCurrentNodeInfo();
    const currentDivNode = currentSpanNode.parentNode as EditableDivElement;
    const currentBlockCleanContent = currentSpanNode.getCleanTextContent();

    const keyHandlers: { [key: string]: KeyHandler } = {
      Enter: handleEnterKey,
      Backspace: handleBackspaceKey,
      ArrowLeft: handleLeftArrowKey,
      ArrowRight: handleRightArrowKey,
      " ": handleSpaceKey,
    };

    const handler = keyHandlers[event.key];
    if (handler) {
      handler(
        event,
        currentDivNode,
        currentSpanNode,
        currentBlockCleanContent,
        textBeforeCaret,
        textAfterCaret
      );
    }

    setLastKeyPressed(event.key);
  };

  const handleLeftArrowKey: KeyHandler = (
    event,
    currentDivNode,
    currentSpanNode,
    currentBlockCleanContent,
    textBeforeCaret,
    textAfterCaret
  ) => {
    if (textBeforeCaret === "\u200B") {
      event.preventDefault();
      const previousEditableSpan = (
        isInitialSpanElement(currentDivNode, currentSpanNode) //if intial span element, set caret to end of previous div
          ? currentDivNode.previousElementSibling.lastElementChild
          : currentSpanNode.previousElementSibling
      ) as EditableSpanElement;
      if (previousEditableSpan) {
        previousEditableSpan.setCaretAtEnd();
      }
    }
  };

  const handleRightArrowKey: KeyHandler = (
    event,
    currentDivNode,
    currentSpanNode,
    currentBlockCleanContent,
    textBeforeCaret,
    textAfterCaret
  ) => {
    if (textAfterCaret === "") {
      event.preventDefault();
      const nextSpan = (
        isFinalSpanElement(currentDivNode, currentSpanNode) //if final span element, set caret to start of next div
          ? currentDivNode.nextElementSibling.firstChild
          : currentSpanNode.nextElementSibling
      ) as EditableSpanElement;
      if (nextSpan) {
        nextSpan.setCaretAtStart();
      }
    }
  };

  const handleEnterKey: KeyHandler = (
    event,
    currentDivNode,
    currentSpanNode,
    currentBlockCleanContent,
    textBeforeCaret,
    textAfterCaret
  ) => {
    event.preventDefault();
    currentDivNode.appendNewEditableDivAfter();
  };

  const handleBackspaceKey: KeyHandler = (
    event,
    currentDivNode,
    currentSpanNode,
    currentBlockCleanContent,
    textBeforeCaret,
    textAfterCaret
  ) => {
    if (textBeforeCaret !== "\u200B") return;

    if (isInitialSpanElement(currentDivNode, currentSpanNode)) {
      handleBackspaceForInitialSpan(event, currentDivNode);
    } else {
      console.log("converting to editable div since space bad");
      handleBackspaceForSecondarySpans(event, currentDivNode);
    }
  };

  const handleBackspaceForInitialSpan = (
    event: React.KeyboardEvent,
    currentDivNode: EditableDivElement
  ) => {
    event.preventDefault();
    if (currentDivNode.parentNode.firstChild === currentDivNode) return;

    const previousDivNode =
      currentDivNode.previousSibling as EditableDivElement;
    previousDivNode.content.textContent += currentDivNode.getCleanTextContent();
    currentDivNode.remove();
    previousDivNode.setCaretAtEnd();
  };

  const handleBackspaceForSecondarySpans = (
    event: React.KeyboardEvent,
    currentDivNode: EditableDivElement
  ) => {
    event.preventDefault();
    currentDivNode.convertToEditableBlock(true);
  };

  const handleSpaceKey: KeyHandler = (
    event,
    currentDivNode,
    currentSpanNode,
    currentBlockCleanContent,
    textBeforeCaret,
    textAfterCaret
  ) => {
    if (
      lastKeyPressed === "*" &&
      currentDivNode instanceof EditableBlockElement &&
      currentBlockCleanContent === "*"
    ) {
      event.preventDefault();
      console.log("Converting to bullet");
      currentDivNode.replaceWithEditableBullet();
    } else if (
      lastKeyPressed === "#" &&
      currentDivNode instanceof EditableBlockElement &&
      isValidMarkdownHeading(currentBlockCleanContent)
    ) {
      event.preventDefault();
      console.log("Converting to header");
      currentDivNode.replaceWithEditableHeader(currentBlockCleanContent);
    }
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
