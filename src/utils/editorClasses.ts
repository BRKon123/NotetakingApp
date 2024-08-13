import { getHeaderTextSizeTailwindClasses } from "./editorOperations";

export class EditableSpanElement extends HTMLSpanElement {
  constructor() {
    super();
  }

  // Initialize method to set up the element
  initialize(textContent: string = null, tailwindStyles: string = null): this {
    this.className =
      "focus:outline-none " + (tailwindStyles ? tailwindStyles : "");
    this.textContent = "\u200B" + (textContent ? textContent : ""); // add zero-width space regardless of whether there is content
    return this;
  }

  // Return the text content excluding zero-width spaces
  getCleanTextContent(): string {
    return this.textContent.replace(/\u200B/g, "");
  }
}

export class EditableContentSpanElement extends EditableSpanElement {}

export class EditableHeaderSpanElement extends EditableSpanElement {}

export class EditableBulletSpanElement extends EditableSpanElement {}

export class EditableDivElement extends HTMLDivElement {
  content: EditableContentSpanElement;

  constructor() {
    super();
  }

  // Method to set the children of the element
  // use # to indicate that this is a private function
  #setChildren(nodes: Node[]): void {
    // Remove all existing children
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    // Append the new children
    nodes.forEach((node) => this.appendChild(node));
  }

  // Initialize method to set up the element
  initialize(
    divStyleString: string = null,
    textContent: string = null,
    contentStyleString: string = null
  ): this {
    this.className =
      "focus:outline-none " + (divStyleString ? divStyleString : "");
    this.content = createEditableContentSpanElement(
      textContent,
      contentStyleString
    );
    this.#setChildren([this.content]); // want to ensure that there is only one child
    return this;
  }

  // basically just resets the div element to its initial state
  convertToEditableDiv(cursorInContentPart: boolean): EditableDivElement {
    this.initialize();
    return this;
  }

  appendNewEditableDivAfter(): void {
    const newDiv = createEditableBlock();
    this.after(newDiv);
    newDiv.setCaretAtStart();
  }

  setCaretAtStart() {
    if (this.content) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(this.content, this.content.childNodes.length); // Set the caret at the start of the content span
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  // return all the text of the element
  getText(): string {
    return this.content.textContent;
  }
  // return the text of the element excluding any zero-width spaces
}

export class EditableBlockElement extends EditableDivElement {
  replaceWithEditableBullet(): void {
    const newBullet = createEditableBullet();
    this.replaceWith(newBullet);
    newBullet.setCaretAtStart();
  }

  replaceWithEditableHeader(headingString: string): void {
    const newHeader = createEditableHeader(headingString);
    this.replaceWith(newHeader);
    newHeader.setCaretAtStart();
  }
}

export class EditableBulletElement extends EditableDivElement {
  bullet: EditableBulletSpanElement;

  constructor() {
    super();
  }

  initialize(textContent: string = null): this {
    super.initialize("flex items-start", textContent);
    this.bullet = createEditableBulletSpanElement("• ", "ml-4 mr-2");
    this.prepend(this.bullet);
    return this;
  }

  // for use when we backspace within the bullet part or at zero width space of content
  // function not triggered when cursor is at zero width space of bullet
  convertToEditableDiv(cursorInContentPart: boolean): EditableDivElement {
    const newDivContentString =
      (cursorInContentPart
        ? this.bullet.textContent.trim() //if curson in content part then remove space after header
        : this.bullet.getCleanTextContent()) + this.bullet.textContent;
    const newDiv = createEditableBlock(newDivContentString);
    this.replaceWith(newDiv);
    return newDiv;
  }
}

export class EditableHeaderElement extends EditableDivElement {
  header: EditableHeaderSpanElement;

  constructor() {
    super();
  }

  initialize(headingString: string, textContent: string = null): this {
    const headerLevel = headingString.split(" ")[0].length;
    const tailwindTextSizeClasses =
      getHeaderTextSizeTailwindClasses(headerLevel);
    super.initialize("my-2", textContent, tailwindTextSizeClasses);

    this.header = createEditableHeaderSpanElement(
      headingString + " ",
      tailwindTextSizeClasses
    );

    this.prepend(this.header);
    return this;
  }

  // for use when we backspace within the header part or at zero width space of content
  // function not triggered when cursor is at zero width space of header
  convertToEditableDiv(cursorInContentPart: boolean): EditableDivElement {
    const newDivContentString =
      (cursorInContentPart
        ? this.header.textContent.trim() //if curson in content part then remove space after header
        : this.header.getCleanTextContent()) + this.header.textContent; // if cursor not in content part just remove the zero-width space
    const newDiv = createEditableBlock(newDivContentString);
    this.replaceWith(newDiv);
    return newDiv;
  }
}

// Register the custom elements
customElements.define("editable-span", EditableSpanElement, {
  extends: "span",
});
customElements.define("editable-content-span", EditableContentSpanElement, {
  extends: "span",
});
customElements.define("editable-header-span", EditableHeaderSpanElement, {
  extends: "span",
});
customElements.define("editable-bullet-span", EditableBulletSpanElement, {
  extends: "span",
});
customElements.define("editable-div", EditableDivElement, { extends: "div" });
customElements.define("editable-block", EditableBlockElement, {
  extends: "div",
});
customElements.define("editable-bullet", EditableBulletElement, {
  extends: "div",
});
customElements.define("editable-header", EditableHeaderElement, {
  extends: "div",
});

// Factory functions for creating instances of the custom elements using the initialise method after registration in dom
export const createEditableContentSpanElement = (
  textContent: string = null,
  tailwindStyles: string = null
): EditableContentSpanElement => {
  return (
    document.createElement("span", {
      is: "editable-content-span",
    }) as EditableContentSpanElement
  ).initialize(textContent, tailwindStyles);
};

export const createEditableHeaderSpanElement = (
  textContent: string = null,
  tailwindStyles: string = null
): EditableHeaderSpanElement => {
  return (
    document.createElement("span", {
      is: "editable-header-span",
    }) as EditableHeaderSpanElement
  ).initialize(textContent, tailwindStyles);
};

export const createEditableBulletSpanElement = (
  textContent: string = null,
  tailwindStyles: string = null
): EditableBulletSpanElement => {
  return (
    document.createElement("span", {
      is: "editable-bullet-span",
    }) as EditableBulletSpanElement
  ).initialize(textContent, tailwindStyles);
};

export const createEditableBlock = (
  textContent: string = null,
  divStyleString: string = null,
  contentStyleString: string = null
): EditableBlockElement => {
  return (
    document.createElement("div", {
      is: "editable-block",
    }) as EditableBlockElement
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
