import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";

import axios from "axios";

export default function Cards({
  data,
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
  setAutocompleteList,
  directionCard,
  disconnectModal,
}) {
  return (
    <main className="cards-bloc" onClick={() => setAutocompleteList(false)}>
      {data.results ? (
        data.results.map((element) => {
          let picture = `${element.thumbnail.path}/portrait_large.${element.thumbnail.extension}`;
          return (
            <Link
              key={element._id}
              to={`${path}${element._id}`}
              state={{ data: element }}
              className={
                directionCard === "to right"
                  ? "card card__right"
                  : "card card__left"
              }
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
                      : (event) =>
                          displayModal(setLoginModal, loginModal, event)
                  }
                >
                  <FontAwesomeIcon
                    className="favorite__icon"
                    icon="fa-regular fa-heart"
                  />
                </div>
                <div className="card__bloc">
                  <h4 className="card__title">
                    {element.name || element.title}
                  </h4>
                  {picture && <img src={picture} alt="picture of a hero" />}
                </div>
                <div className="bloc-description">
                  {element.description ? (
                    <p className="card__description">{element.description}</p>
                  ) : (
                    <p className="card__description--empty">
                      Need to be completed !
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="cards-bloc__empty">Sorry but nothing is find</p>
      )}
    </main>
  );
}
