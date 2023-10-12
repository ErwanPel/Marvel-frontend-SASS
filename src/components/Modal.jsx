import SignPage from "../pages/SignPage";
import LoginPage from "../pages/LoginPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useModalContext } from "../context/ModalContext";

export default function Modal({ setToken }) {
  const [userError, setUserError] = useState(false);

  const {
    setSignModal,
    signModal,
    setLoginModal,
    loginModal,
    setDisconnectModal,
    disconnectModal,
  } = useModalContext();

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
      <div className={userError && "user-error"}>
        <div
          className="modal-window__bloc"
          onClick={(event) => event.stopPropagation()}
        >
          {signModal && (
            <FontAwesomeIcon
              aria-hidden={false}
              aria-label="close the modal window"
              icon="xmark"
              tabIndex={0}
              className="modal-window__close"
              onClick={closeSignModal}
              onKeyUp={(event) => {
                event.code === "Enter" && closeSignModal();
              }}
            />
          )}
          {loginModal && (
            <FontAwesomeIcon
              aria-hidden={false}
              aria-label="close the modal window"
              icon="xmark"
              tabIndex={0}
              className="modal-window__close"
              onClick={closeLoginModal}
              onKeyUp={(event) => {
                event.code === "Enter" && closeLoginModal();
              }}
            />
          )}
          {disconnectModal && (
            <FontAwesomeIcon
              aria-hidden={false}
              aria-label="close the modal window"
              icon="xmark"
              tabIndex={0}
              className="modal-window__close"
              onClick={closeDisconnectModal}
              onKeyUp={(event) => {
                event.code === "Enter" && closeDisconnectModal();
              }}
            />
          )}
          {signModal && (
            <SignPage
              signModal={signModal}
              setSignModal={setSignModal}
              setToken={setToken}
              setUserError={setUserError}
              setLoginModal={setLoginModal}
            />
          )}
          {loginModal && (
            <LoginPage
              loginModal={loginModal}
              setLoginModal={setLoginModal}
              setToken={setToken}
              setUserError={setUserError}
              setSignModal={setSignModal}
            />
          )}
          {disconnectModal && (
            <p className="disconnect-message">You have been disconnected :)</p>
          )}
        </div>
      </div>
    </div>
  );
}
