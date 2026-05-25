import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [walletAddress, setWalletAddress] =
    useState("");

  const [role, setRole] =
    useState("Customer");

  useEffect(() => {

    async function loadWallet() {

      if (window.ethereum) {

        const accounts =
          await window.ethereum.request({
            method: "eth_accounts"
          });

        if (accounts.length > 0) {

          const address = accounts[0];

          setWalletAddress(address);

          // SIMPLE ROLE MAPPING

          if (
            address.toLowerCase() ===
            "0xc10A40D423553F54a0762f2bc17a6A06a7d19b06".toLowerCase()
          ) {
            setRole("Admin");
          }

          else {
            setRole("Manufacturer");
          }
        }
      }
    }

    loadWallet();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        walletAddress,
        role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}