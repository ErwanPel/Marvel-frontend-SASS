import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ComicPage({
  favoriteChar,
  setFavoriteChar,
  token,
  loginModal,
  signModal,
  favoriteComics,
  setFavoriteComics,
  setLoginModal,
}) {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { comicId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comic/${comicId}`
      );
      setComicData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (location.state) {
      setComicData(location.state.data);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  console.log(token);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <main>
      {comicData.description ? (
        <>
          <h2>{comicData.title}</h2>

          <div className="comic-bloc">
            {!comicData.thumbnail.path.match("image_not_available") && (
              <div>
                <img
                  src={`${comicData.thumbnail.path}/portrait_uncanny.${comicData.thumbnail.extension}`}
                  alt=""
                />
              </div>
            )}
            <div>
              <h3>Description</h3>
              <p>{comicData.description}</p>
            </div>
            <div
              className={
                ((loginModal || signModal) && "favorite__modal") ||
                (favoriteChar.indexOf(comicData._id) === -1
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
                        comicData._id,
                        comicData.name,
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
          </div>
        </>
      ) : (
        <div className="section-to-complete">
          <p>This section need to be completed ! </p>
          <p>Sorry 🦹‍♂️</p>
        </div>
      )}
    </main>
  );
}
//
