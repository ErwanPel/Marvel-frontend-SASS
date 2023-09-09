import SignPage from "../pages/SignPage";
import LoginPage from "../pages/LoginPage";

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
          <button className="modal-window__close" onClick={closeSignModal}>
            X
          </button>
        )}
        {loginModal && (
          <button className="modal-window__close" onClick={closeLoginModal}>
            X
          </button>
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
