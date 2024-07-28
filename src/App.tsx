import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import { TabsProvider } from "./context/TabsContext";
import { VaultProvider } from "./context/VaultContext";

const App: React.FC = () => {
  return (
    <VaultProvider>
      <TabsProvider>
        <Layout />
      </TabsProvider>
    </VaultProvider>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
