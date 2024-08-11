import {
  EditableDivElement,
  EditableBulletElement,
} from "../models/editorTypes";

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
  span.className =
    "focus:outline-none " + (tailwindStyles ? tailwindStyles : "");
  span.textContent = textContent ? textContent : "\u200B"; // Add a zero-width space as the initial content if string empty

  return span;
};

export const createEditableDiv = (): EditableDivElement => {
  const newDiv = document.createElement("div") as EditableDivElement;
  newDiv.className = "focus:outline-none";

  const span = createEditableSpan();
  newDiv.appendChild(span);
  newDiv.content = span;

  return newDiv;
};

export const createEditableBullet = (
  textContent: string = null // the content of the bullet
): EditableBulletElement => {
  const newDiv = document.createElement("div") as EditableBulletElement;
  newDiv.className = "focus:outline-none flex items-start";

  const bulletSpan = createEditableSpan("• ", "ml-4 mr-2");

  const contentSpan = createEditableSpan(textContent);
  newDiv.appendChild(bulletSpan);
  newDiv.appendChild(contentSpan);
  newDiv.bullet = bulletSpan;
  newDiv.content = contentSpan;

  return newDiv;
};

export function getElementCleanTextContent(element: HTMLElement): string {
  if (!element || !element.textContent) {
    return "";
  }
  return element.textContent.replace(/\u200B/g, "");
}
