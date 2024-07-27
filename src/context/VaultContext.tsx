import React, { createContext, useContext, useState } from "react";
import Vault from "../models/Vault";

interface VaultContextProps {
  vaultInfo: Vault;
  setVaultInfo: (vault: Vault) => void;
}

const VaultContext = createContext<VaultContextProps | undefined>(undefined);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vaultInfo, setVaultInfo] = useState<Vault>({
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
