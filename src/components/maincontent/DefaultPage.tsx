import React from "react";

const DefaultPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold mb-4">No file is open</h1>
      <div className="space-y-2 text-pink-500">
        <button className="block hover:underline">Create new note (⌘ N)</button>
        <button className="block hover:underline">Go to file (⌘ O)</button>
        <button className="block hover:underline">
          See recent files (⌘ O)
        </button>
        <button className="block hover:underline">Close</button>
      </div>
    </div>
  );
};

export default DefaultPage;
