export interface EditableDivElement extends HTMLDivElement {
  content: HTMLSpanElement;
}

export interface EditableBulletElement extends EditableDivElement {
  bullet: HTMLSpanElement;
}

export interface EditableHeaderElement extends EditableDivElement {
  header: HTMLSpanElement;
}

export function isEditableDivElement(obj: any): obj is EditableDivElement {
  return obj.content !== undefined && obj.bullet === undefined;
}

export function isEditableBulletElement(
  obj: any
): obj is EditableBulletElement {
  return obj.content !== undefined && obj.bullet !== undefined;
}

export function isEditableHeaderElement(
  obj: any
): obj is EditableHeaderElement {
  return obj.content !== undefined && obj.header !== undefined;
}
