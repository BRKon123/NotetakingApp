import EditableDivElement from "../models/EditableDivElement";

export const setCaretAtStart = (element?: HTMLElement) => {
  if (element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element, element.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const createEditableSpan = (): HTMLSpanElement => {
  const span = document.createElement("span");
  span.className = "focus:outline-none";
  span.textContent = "\u200B"; // Add a zero-width space as the initial content so that we can start typing afte this

  return span;
};
