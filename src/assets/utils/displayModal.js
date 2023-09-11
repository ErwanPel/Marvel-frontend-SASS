const displayModal = (setLoginModal, loginModal, event) => {
  event.preventDefault();
  setLoginModal(!loginModal);
};

export { displayModal };
