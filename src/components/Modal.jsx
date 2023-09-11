import SignPage from "../pages/SignPage";
import LoginPage from "../pages/LoginPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  setToken,
}) {
  const closeSignModal = () => {
    setSignModal(() => false);
  };

  const closeLoginModal = () => {
    setLoginModal(() => false);
  };

  return (
    <div
      className="modal-window"
      onClick={loginModal ? closeLoginModal : closeSignModal}
    >
      <div
        className="modal-window__bloc"
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
        {signModal && (
          <SignPage
            signModal={signModal}
            setSignModal={setSignModal}
            setToken={setToken}
          />
        )}
        {loginModal && (
          <LoginPage
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            setToken={setToken}
          />
        )}
      </div>
    </div>
  );
}
