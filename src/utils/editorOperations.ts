import EditableDivElement from "../models/EditableDivElement";

export const setCaretAtStart = (element?: HTMLElement) => {
  if (element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const createEditableSpan = (): HTMLSpanElement => {
  const span = document.createElement("span");
  span.contentEditable = "true";
  span.className = "focus:outline-none";

  return span;
};
