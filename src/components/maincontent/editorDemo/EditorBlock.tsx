import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { caretCoordinates, caretToEnd } from "./helpers";
import ContentEditable from "react-contenteditable";
import ContextMenu from "./ContextMenu";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
const CMD_KEY = "/";
const blockPlaceholders = {
  p: "Enter your paragraph text...",
  h1: "Enter your page title...",
  h2: "Enter your heading...",
  h3: "Enter your subheading...",
  i: "Enter your italic text...",
  table: "Enter your table...",
};

const EditorBlock = (props) => {
  const contentEditable = useRef(null);
  const [placeholder, setPlaceholder] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [state, setState]: [any, Dispatch<SetStateAction<any>>] = useState({
    html: props.html || "",
    tag: props.tag,
    previousKey: "",
    selectMenuIsOpen: false,
    selectMenuPosition: {
      x: null,
      y: null,
    },
  });

  useEffect(() => {
    contentEditable.current.focus();
  }, []);

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", ""); // Required for Firefox
    e.dataTransfer.setData("blockId", props.id); // Set the block ID for identifying the block being dragged
    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedBlockId = e.dataTransfer.getData("blockId");
    props.recorderBlocks(droppedBlockId, props.id);
  };

  const onKeyUpHandler = (e) => {
    if (e.key === CMD_KEY) {
      openSelectMenuHandler();
    }
  };

  const openSelectMenuHandler = () => {
    const { x, y } = caretCoordinates();
    setState((prevState) => ({
      ...prevState,
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    }));
    document.addEventListener("click", closeSelectMenuHandler);
  };

  const closeSelectMenuHandler = () => {
    setState((prevState) => ({
      ...prevState,
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null },
    }));
    document.removeEventListener("click", closeSelectMenuHandler);
  };

  const tagSelectionHandler = (tag) => {
    const updatedHtml = "";

    const selectedPlaceholder = blockPlaceholders[tag] || "";
    setPlaceholder(selectedPlaceholder);

    setState((prevState) => ({
      ...prevState,
      html: updatedHtml,
      tag,
    }));
  };

  useEffect(() => {
    contentEditable.current.html = state.html;
    caretToEnd(contentEditable.current);
    closeSelectMenuHandler();
  }, [state]);

  const onChangeHandler = (e) => {
    setState((prevState) => ({ ...prevState, html: e.target.value }));
  };

  const addBlockHandler = () => {
    props.addBlock({
      id: props.id,
      ref: contentEditable.current,
    });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === CMD_KEY) {
      contentEditable.current.html = state.html;
    }

    if (e.key === "Enter") {
      if (state.previousKey !== "Shift" && !state.selectMenuIsOpen) {
        e.preventDefault();
        props.addBlock({
          id: props.id,
          ref: contentEditable.current,
        });
      }
    }

    if (e.key === "Backspace") {
      props.deleteBlock({
        id: props.id,
        ref: contentEditable.current,
      });
    }

    setState((prevState) => ({ ...prevState, previousKey: e.key }));
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.addBlock({
        id: props.id,
        ref: contentEditable.current,
      });
      closeSelectMenuHandler();
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`block-container ${isDragging ? "dragging" : ""}`}
    >
      {state.selectMenuIsOpen && (
        <ContextMenu
          position={state.selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeSelectMenuHandler}
        />
      )}
      <button onClick={addBlockHandler} className="add-block-button">
        <BsPlusLg />
      </button>

      <AiOutlineAppstore
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="drag-icon"
      />
      <ContentEditable
        className="editor-block"
        innerRef={contentEditable}
        html={state.html}
        tagName={state.tag}
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          onKeyDownHandler(e);
          onEnterPress(e);
        }}
        onKeyUp={onKeyUpHandler}
      />
    </div>
  );
};

export default EditorBlock;
