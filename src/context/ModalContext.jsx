import { useContext, createContext, useState } from "react";

const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [disconnectModal, setDisconnectModal] = useState(false);

  const modalValue = {
    loginModal,
    setLoginModal,
    signModal,
    setSignModal,
    disconnectModal,
    setDisconnectModal,
  };

  return (
    <ModalContext.Provider value={modalValue}>{children}</ModalContext.Provider>
  );
}

export const useModalContext = () => {
  return useContext(ModalContext);
};
