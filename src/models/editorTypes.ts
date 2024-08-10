export interface EditableDivElement extends HTMLDivElement {
  content: HTMLSpanElement;
}

export interface EditableBulletElement extends HTMLDivElement {
  bullet: HTMLSpanElement;
  content: HTMLSpanElement;
}

export function isEditableDivElement(obj: any): obj is EditableDivElement {
  return obj.content !== undefined && obj.bullet === undefined;
}

export function isEditableBulletElement(
  obj: any
): obj is EditableBulletElement {
  return obj.content !== undefined && obj.bullet === undefined;
}
