import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useModalContext } from "../context/ModalContext";

export default function ComicPage({
  favoriteChar,
  setFavoriteChar,
  token,
  favoriteComics,
  setFavoriteComics,
  setMenu,
}) {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backCharacter, setBackCharacter] = useState(false);

  const { loginModal, signModal, disconnectModal, setLoginModal } =
    useModalContext();

  const navigate = useNavigate();
  const location = useLocation();
  const { comicId } = useParams();

  console.log("ici", disconnectModal);

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
      if (location.state.back) {
        setBackCharacter(true);
      }
    } else {
      fetchData();
    }
  }, []);

  console.log(token);

  return isLoading ? (
    <Loader />
  ) : (
    <motion.main
      className="main__comic"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        translateX: -800,
        opacity: 0,
        transition: {
          duration: 0.9,
        },
      }}
    >
      {comicData.description ? (
        <>
          <h2>{comicData.title}</h2>
          <div className="comic__row">
            {backCharacter && (
              <FontAwesomeIcon
                className="back-arrow"
                icon="arrow-left"
                onClick={() => {
                  setMenu(false);
                  setBackCharacter(false);
                  navigate(location.state.from);
                }}
              />
            )}
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
                  ((loginModal || signModal || disconnectModal) &&
                    "favorite__modal") ||
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
          </div>
        </>
      ) : (
        <div className="section-to-complete">
          <p>This section need to be completed ! </p>
          <p>Sorry 🦹‍♂️</p>
          {backCharacter && (
            <FontAwesomeIcon
              className="back-arrow"
              icon="arrow-left"
              onClick={() => {
                setMenu(false);
                setBackCharacter(false);
                navigate(location.state.from);
              }}
            />
          )}
        </div>
      )}
    </motion.main>
  );
}
//
