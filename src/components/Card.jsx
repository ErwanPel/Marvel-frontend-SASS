/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";
import { useModalContext } from "../context/ModalContext";

export default function Card({
  picture,
  element,
  path,
  favoriteChar,
  setFavoriteChar,
  favoriteComics,
  setFavoriteComics,
  favoriteSort,
  token,
  directionCard,
  setMenu,
  numberCard,
}) {
  const { loginModal, setLoginModal, signModal, disconnectModal } =
    useModalContext();

  const keyOnFavorite = (event) => {
    if (token) {
      handleFav(
        favoriteComics,
        setFavoriteComics,
        favoriteChar,
        setFavoriteChar,
        element._id,
        element,
        deleteFav,
        sendFav,
        token,
        event
      );
    } else {
      displayModal(setLoginModal, loginModal, event);
    }
  };

  return (
    <Link
      lang="en"
      label-aria={`go to the article of ${element.title || element.name}`}
      className={
        directionCard === "to right"
          ? `card card__right card__right--${numberCard}`
          : `card card__left card__left--${numberCard}`
      }
      to={`${path}${element._id}`}
      state={{ data: element }}
      onClick={() => setMenu(false)}
      tabIndex={(signModal || loginModal) && "-1"}
    >
      <div
        className={
          directionCard === "to right"
            ? "card__transition card__transition--right"
            : "card__transition card__transition--left"
        }
      >
        <div
          lang="en"
          aria-label="add or remove from my favorite"
          tabIndex={signModal || loginModal ? "-1" : 0}
          className={
            ((loginModal || signModal || disconnectModal) &&
              "favorite__modal") ||
            (!favoriteSort.find((find) => find._id === element._id)
              ? "favorite"
              : "favorite__fullheart")
          }
          onKeyUp={(event) => {
            event.code === "Enter" && keyOnFavorite(event);
          }}
          onClick={
            token
              ? (event) =>
                  handleFav(
                    favoriteComics,
                    setFavoriteComics,
                    favoriteChar,
                    setFavoriteChar,
                    element._id,
                    element,
                    deleteFav,
                    sendFav,
                    token,
                    event
                  )
              : (event) => displayModal(setLoginModal, loginModal, event)
          }
        >
          <FontAwesomeIcon
            className="favorite__icon"
            icon="fa-regular fa-heart"
          />
        </div>
        <div className="card__bloc">
          <h4 lang="en" className="card__title">
            {element.name || element.title}
          </h4>
          {picture && (
            <img
              lang="en"
              src={picture}
              alt={`picture of ${element.name || element.title}`}
            />
          )}
        </div>
        <div className="bloc-description">
          {element.description ? (
            <p lang="en" className="card__description">
              {element.description}
            </p>
          ) : (
            <p lang="en" className="card__description--empty">
              Need to be completed !
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
