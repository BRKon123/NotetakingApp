import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return <Layout />;
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
