export interface EditableDivElement extends HTMLDivElement {
  span: HTMLSpanElement;
}

export interface EditableBulletElement extends HTMLDivElement {
  bullet: HTMLSpanElement;
  content: HTMLSpanElement;
}
