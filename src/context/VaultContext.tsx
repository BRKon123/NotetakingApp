import React, { createContext, useContext, useState } from "react";
import VaultInfo from "../models/VaultInfo";

interface VaultContextProps {
  vaultInfo: VaultInfo;
  setVaultInfo: (vault: VaultInfo) => void;
}

const VaultContext = createContext<VaultContextProps | undefined>(undefined);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vaultInfo, setVaultInfo] = useState<VaultInfo>({
    vaultName: "Example Vault",
    vaultPath:
      "/Users/ruthvikkonduru/Documents/Projects/NotetakingApp/example-vault",
  });

  return (
    <VaultContext.Provider value={{ vaultInfo, setVaultInfo }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => {
  const context = useContext<VaultContextProps | undefined>(VaultContext);
  if (!context) {
    throw new Error("use vault context must be used within a VaultProvider");
  }
  return context as VaultContextProps;
};
