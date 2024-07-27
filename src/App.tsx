import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import { TabsProvider } from "./context/TabsContext";

const App: React.FC = () => {
  return (
    <TabsProvider>
      <Layout />
    </TabsProvider>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
