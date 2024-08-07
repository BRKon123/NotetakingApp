// component that renders the markdown notes and allows them to be edited
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTabsContext } from "../../context/TabsContext";
import { loadFileInFileSystem } from "../../utils/fileSystemOperations";
import Editor from "./editor/Editor";

const MarkdownRenderer: React.FC = () => {
  const { tabs, activeTab } = useTabsContext();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const newContent = await loadFileInFileSystem(tabs[activeTab].filePath);
        setContent(newContent);
      } catch (error) {
        console.error("Error fetching the markdown file:", error);
      }
    };

    fetchMarkdown();
  }, [tabs[activeTab].filePath]);

  return (
    <div className="markdown-body h-full">
      <Editor />
    </div>
  );
};

export default MarkdownRenderer;
