import { Routes, Route, useLocation } from "react-router-dom";

import AllCharactersPage from "../pages/AllCharactersPage";
import CharacterPage from "../pages/CharacterPage";
import ComicPage from "../pages/ComicPage";
import AllComicsPage from "../pages/AllComicsPage";

import { AnimatePresence } from "framer-motion";

export default function RouteChild({
  directionCard,
  setDirectionCard,
  token,
  favoriteComics,
  setFavoriteComics,
  favoriteChar,
  setFavoriteChar,
  autocompleteList,
  setAutocompleteList,
  setMenu,
}) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AllCharactersPage
              setMenu={setMenu}
              setDirectionCard={setDirectionCard}
              directionCard={directionCard}
              token={token}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route
          path="/:characterId"
          element={
            <CharacterPage
              setMenu={setMenu}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              token={token}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <AllComicsPage
              setMenu={setMenu}
              setDirectionCard={setDirectionCard}
              directionCard={directionCard}
              token={token}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicPage
              setMenu={setMenu}
              token={token}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
