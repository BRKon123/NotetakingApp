// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState, useRef } from "react";
import EditableDivElement from "../../../models/EditableDivElement";
import {
  createEditableSpan,
  setCaretAtStart,
} from "../../../utils/editorOperations";

//div element to represent idea blocks with span inside for the content

function Editor() {
  const containerElement = useRef<HTMLDivElement>(null);
  const currentBlock = useRef<EditableDivElement>(null);

  useEffect(() => {
    addFirstEditableDiv();
  }, []);

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      appendNewEditableDivAfter();
    }
  };

  const createEditableDiv = (): EditableDivElement => {
    const newDiv = document.createElement("div") as EditableDivElement;
    newDiv.className = "focus:outline-none";
    newDiv.addEventListener("keydown", handleOnKeyDown);

    const span = createEditableSpan();
    newDiv.appendChild(span);
    newDiv.span = span;

    return newDiv;
  };

  const appendNewEditableDivAfter = () => {
    if (currentBlock.current) {
      const newDiv = createEditableDiv();
      currentBlock.current.after(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart(newDiv.span);
    }
  };

  const addFirstEditableDiv = () => {
    if (containerElement.current) {
      const newDiv = createEditableDiv();
      containerElement.current.appendChild(newDiv);
      // Update the ref to the new div
      currentBlock.current = newDiv;
      //set caret to start of this div
      setCaretAtStart(newDiv.span);
    }
  };

  const duplicateAndAppendDiv = (): void => {
    const clone = currentBlock.current.cloneNode(true) as HTMLDivElement;
    currentBlock.current.appendChild(clone);
  };

  return (
    <div
      ref={containerElement}
      contentEditable={true}
      className="w-full h-full bg-transparent text-black focus:outline-none"
    ></div>
  );
}

export default Editor;
