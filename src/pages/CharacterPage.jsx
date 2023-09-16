import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sendFav, deleteFav, handleFav } from "../assets/utils/favoriteData";
import { displayModal } from "../assets/utils/displayModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

import ComicsByCharacter from "../components/ComicsByCharacter";
import Loader from "../components/Loader";

export default function CharacterPage({
  favoriteChar,
  setFavoriteChar,
  token,
  loginModal,
  signModal,
  favoriteComics,
  setFavoriteComics,
  setLoginModal,
  disconnectModal,
  setMenu,
}) {
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { characterId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/character/${characterId}`
      );
      setCharacterData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (location.state) {
      setCharacterData(location.state.data);
      setIsLoading(false);
    } else {
      fetchData();
    }
    console.log(characterData);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        translateY: 800,
        transition: {
          duration: 0.7,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
        opacity: 0,
      }}
    >
      <h2>{characterData.name}</h2>
      <div className="biography-bloc">
        <div className="biography-bloc__left">
          <div
            className={
              ((loginModal || signModal || disconnectModal) &&
                "favorite__modal") ||
              (favoriteChar.indexOf(characterData._id) === -1
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
                      characterData._id,
                      characterData.name,
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
          {!characterData.thumbnail.path.match("image_not_available") && (
            <img
              src={`${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}`}
              alt={`image de ${characterData.name}`}
            />
          )}
          <div>
            <h3>Description</h3>
            {characterData.description ? (
              <p className="bio-description">{characterData.description}</p>
            ) : (
              <p className="to-complete">Need to be completed ! </p>
            )}
            {characterData.comics.length > 0 && (
              <p>{`${characterData.name} apparaît dans ${
                characterData.comics.length
              } comic${characterData.comics.length > 1 ? "s" : ""} !`}</p>
            )}
          </div>
        </div>
        <div className="biography-bloc__right">
          <h3>Comics</h3>
          <ComicsByCharacter characterId={characterId} setMenu={setMenu} />
        </div>
      </div>
    </motion.main>
  );
}
