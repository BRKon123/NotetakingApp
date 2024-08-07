const setCaretAtStart = () => {
  const div = currentBlock.current;
  if (div) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(div, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
