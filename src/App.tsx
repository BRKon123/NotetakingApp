import React from "react";
import Header from "./components/Header";
import ReactDOM from "react-dom/client";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to Electron with React and TypeScript</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
