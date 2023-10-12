import Card from "../components/Card";
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage({
  token,
  favoriteChar,
  favoriteComics,
  setFavoriteChar,
  setFavoriteComics,
  setMenu,
  setAutocompleteList,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // This useEffect contain the fetchFav function which obtain the list
    // of the favorites comics from the database in the state favoriteComics
    const fetchFav = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
          { headers: { authorization: `Bearer ${token}` } }
        );

        if (response.data.comics !== undefined) {
          setFavoriteComics(response.data.comics);
        }

        if (response.data.characters !== undefined) {
          setFavoriteChar(response.data.characters);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFav();
  }, [token]);

  return token ? (
    <motion.main
      className="favorite-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
    >
      <h2 lang="en">Favorites Character</h2>
      <div className="favorite-page__bloc">
        {favoriteChar.map((fav, index) => {
          let picture = `${fav.thumbnail.path}/portrait_xlarge.${fav.thumbnail.extension}`;
          return (
            <Card
              key={fav._id}
              element={fav}
              numberCard={`${index + 1}`}
              setMenu={setMenu}
              picture={picture}
              path="/characters/"
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              favoriteSort={favoriteChar}
              token={token}
              setAutocompleteList={setAutocompleteList}
              directionCard="to right"
            />
          );
        })}
      </div>
      <h2 lang="en">Favorites Comics</h2>
      <div className="favorite-page__bloc">
        {favoriteComics.map((fav, index) => {
          let picture = `${fav.thumbnail.path}/portrait_xlarge.${fav.thumbnail.extension}`;
          return (
            <Card
              key={fav._id}
              element={fav}
              numberCard={`${index + 1}`}
              setMenu={setMenu}
              picture={picture}
              path="/comics/"
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              favoriteSort={favoriteComics}
              token={token}
              setAutocompleteList={setAutocompleteList}
              directionCard="to left"
            />
          );
        })}
      </div>
    </motion.main>
  ) : (
    navigate("/")
  );
}
