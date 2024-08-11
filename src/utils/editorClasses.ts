import {
  createEditableSpan,
  getHeaderTextSizeTailwindClasses,
} from "./editorOperations";

export class EditableDivElement extends HTMLDivElement {
  content: HTMLSpanElement;

  constructor() {
    super();
  }

  // Initialize method to set up the element
  initialize(
    divStyleString: string = null,
    textContent: string = null,
    contentStyleString: string = null
  ): this {
    this.className =
      "focus:outline-none " + (divStyleString ? divStyleString : "");
    this.content = createEditableSpan(textContent, contentStyleString);
    this.appendChild(this.content);
    return this;
  }

  setCaretAtStart() {
    if (this.content) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(this.content, 0); // Set the caret at the start of the content span
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  getCleanTextContent(): string {
    if (!this.content || !this.content.textContent) {
      return "";
    }
    return this.content.textContent.replace(/\u200B/g, "");
  }
}

export class EditableBulletElement extends EditableDivElement {
  bullet: HTMLSpanElement;

  constructor() {
    super();
  }

  initialize(textContent: string = null): this {
    super.initialize("flex items-start", textContent);
    this.bullet = createEditableSpan("• ", "ml-4 mr-2");
    this.prepend(this.bullet);
    return this;
  }
}

export class EditableHeaderElement extends EditableDivElement {
  header: HTMLSpanElement;

  constructor() {
    super();
  }

  initialize(headingString: string, textContent: string = null): this {
    const headerLevel = headingString.split(" ")[0].length;
    const tailwindTextSizeClasses =
      getHeaderTextSizeTailwindClasses(headerLevel);
    super.initialize("my-2", textContent, tailwindTextSizeClasses);

    this.header = createEditableSpan(
      headingString + " ",
      tailwindTextSizeClasses
    );

    this.prepend(this.header);
    return this;
  }
}

// Register the custom elements
customElements.define("editable-div", EditableDivElement, { extends: "div" });
customElements.define("editable-bullet", EditableBulletElement, {
  extends: "div",
});
customElements.define("editable-header", EditableHeaderElement, {
  extends: "div",
});

// Factory functions for creating instances of the custom elements
export const createEditableDiv = (
  textContent: string = null,
  divStyleString: string = null,
  contentStyleString: string = null
): EditableDivElement => {
  return (
    document.createElement("div", { is: "editable-div" }) as EditableDivElement
  ).initialize(textContent, divStyleString, contentStyleString);
};

export const createEditableBullet = (
  textContent: string = null
): EditableBulletElement => {
  return (
    document.createElement("div", {
      is: "editable-bullet",
    }) as EditableBulletElement
  ).initialize(textContent);
};

export const createEditableHeader = (
  headingString: string,
  textContent: string = null
): EditableHeaderElement => {
  return (
    document.createElement("div", {
      is: "editable-header",
    }) as EditableHeaderElement
  ).initialize(headingString, textContent);
};
