import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";

export default function Card({
  picture,
  element,
  path,
  favoriteChar,
  setFavoriteChar,
  favoriteComics,
  setFavoriteComics,
  loginModal,
  setLoginModal,
  signModal,
  favoriteSort,
  token,
  directionCard,
  disconnectModal,
  setMenu,
  numberCard,
}) {
  return (
    <Link
      className={
        directionCard === "to right"
          ? `card card__right card__right--${numberCard}`
          : `card card__left card__left--${numberCard}`
      }
      to={`${path}${element._id}`}
      state={{ data: element }}
      onClick={() => setMenu(false)}
    >
      <div
        className={
          directionCard === "to right"
            ? "card__transition card__transition--right"
            : "card__transition card__transition--left"
        }
      >
        <div
          className={
            ((loginModal || signModal || disconnectModal) &&
              "favorite__modal") ||
            (favoriteSort.indexOf(element._id) === -1
              ? "favorite"
              : "favorite__fullheart")
          }
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
          <h4 className="card__title">{element.name || element.title}</h4>
          {picture && <img src={picture} alt="picture of a hero" />}
        </div>
        <div className="bloc-description">
          {element.description ? (
            <p className="card__description">{element.description}</p>
          ) : (
            <p className="card__description--empty">Need to be completed !</p>
          )}
        </div>
      </div>
    </Link>
  );
}
