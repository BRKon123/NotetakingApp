// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const currentBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

  const setCaretAtStart = () => {
    const div = currentBlock.current;
    if (div) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(div, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  //
  const createEditableDiv = (): HTMLDivElement => {
    const newDiv = document.createElement("div");
    newDiv.className = "focus:outline-none";
    newDiv.contentEditable = "true";
    newDiv.addEventListener("keydown", handleOnKeyDown);
    return newDiv;
  };

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      appendNewEditableDivAfter();
    }
  };

  const appendNewEditableDivAfter = () => {
    if (currentBlock.current) {
      const newDiv = createEditableDiv();
      currentBlock.current.after(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart();
    }
  };

  const addFirstEditableDiv = () => {
    if (containerElement.current) {
      const newDiv = createEditableDiv();
      containerElement.current.appendChild(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart();
    }
  };

  const duplicateAndAppendDiv = (): void => {
    const clone = currentBlock.current.cloneNode(true) as HTMLDivElement;
    currentBlock.current.appendChild(clone);
  };

  return (
    <div
      ref={containerElement}
      className="w-full h-full bg-transparent text-black focus:outline-none"
    ></div>
  );
}

export default Editor;
