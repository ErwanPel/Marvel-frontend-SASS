import SignPage from "../pages/SignPage";
import LoginPage from "../pages/LoginPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Modal({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  setToken,
  disconnectModal,
  setDisconnectModal,
}) {
  const [userError, setUserError] = useState(false);

  const closeSignModal = () => {
    setSignModal(() => false);
  };

  const closeLoginModal = () => {
    setLoginModal(() => false);
  };

  const closeDisconnectModal = () => {
    setDisconnectModal(() => false);
  };

  return (
    <div
      className="modal-window"
      onClick={
        loginModal
          ? closeLoginModal
          : signModal
          ? closeSignModal
          : closeDisconnectModal
      }
    >
      <div
        className={
          userError ? "modal-window__bloc user-error" : "modal-window__bloc"
        }
        onClick={(event) => event.stopPropagation()}
      >
        {signModal && (
          <FontAwesomeIcon
            icon="xmark"
            className="modal-window__close"
            onClick={closeSignModal}
          />
        )}
        {loginModal && (
          <FontAwesomeIcon
            icon="xmark"
            className="modal-window__close"
            onClick={closeLoginModal}
          />
        )}
        {disconnectModal && (
          <FontAwesomeIcon
            icon="xmark"
            className="modal-window__close"
            onClick={closeDisconnectModal}
          />
        )}
        {signModal && (
          <SignPage
            signModal={signModal}
            setSignModal={setSignModal}
            setToken={setToken}
            setUserError={setUserError}
          />
        )}
        {loginModal && (
          <LoginPage
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            setToken={setToken}
            setUserError={setUserError}
          />
        )}
        {disconnectModal && (
          <p className="disconnect-message">You have been disconnected :)</p>
        )}
      </div>
    </div>
  );
}
