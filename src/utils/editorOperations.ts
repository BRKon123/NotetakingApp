import {
  EditableDivElement,
  EditableBulletElement,
  EditableHeaderElement,
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

export const createEditableHeader = (
  level: number,
  textContent: string = null // the content of the header
): EditableHeaderElement => {
  const newDiv = document.createElement("div") as EditableHeaderElement;
  newDiv.className = `focus:outline-none my-2`;

  const headerSpan = createEditableSpan(
    "",
    getHeaderTextSizeTailwindClasses(level)
  );

  const contentSpan = createEditableSpan(textContent);
  newDiv.appendChild(headerSpan);
  newDiv.appendChild(contentSpan);
  newDiv.header = headerSpan;
  newDiv.content = contentSpan;

  return newDiv;
};

const getHeaderTextSizeTailwindClasses = (level: number): string => {
  switch (level) {
    case 1:
      return "text-3xl font-bold";
    case 2:
      return "text-2xl font-bold";
    case 3:
      return "text-xl font-bold";
    case 4:
      return "text-lg font-bold";
    case 5:
      return "text-base font-bold";
    case 6:
      return "text-sm font-bold";
    default:
      return "";
  }
};

export const getElementCleanTextContent = (element: HTMLElement): string => {
  if (!element || !element.textContent) {
    return "";
  }
  return element.textContent.replace(/\u200B/g, "");
};
