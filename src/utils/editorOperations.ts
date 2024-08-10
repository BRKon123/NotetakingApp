import { EditableDivElement } from "../models/editorTypes";

export const setCaretAtStart = (element?: HTMLElement) => {
  if (element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element, element.childNodes.length); //start after the zero-width spaces
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const createEditableSpan = (
  textContent: string = null, //default to an empty string
  tailwindStyles: string = null //default to an empty string
): HTMLSpanElement => {
  const span = document.createElement("span");
  span.className = "focus:outline-none" + tailwindStyles;
  span.textContent = textContent ? textContent : "\u200B"; // Add a zero-width space as the initial content if string empty

  return span;
};
