import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import { TabsProvider } from "./context/TabsContext";
import { VaultProvider } from "./context/VaultContext";

const doc = document.getElementById("root");
console.log("Hello, Electron!", doc);
window.electronAPI.hello();
window.electronAPI.createFile(
  "/Users/ruthvikkonduru/Documents/Projects/NotetakingApp/example-vault/examp.txt"
);

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
