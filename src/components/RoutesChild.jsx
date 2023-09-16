import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import AllCharactersPage from "../pages/AllCharactersPage";
import CharacterPage from "../pages/CharacterPage";
import ComicPage from "../pages/ComicPage";
import AllComicsPage from "../pages/AllComicsPage";

import { AnimatePresence } from "framer-motion";

export default function RouteChild({
  disconnectModal,
  directionCard,
  setDirectionCard,
  loginModal,
  setLoginModal,
  signModal,
  token,
  favoriteComics,
  setFavoriteComics,
  favoriteChar,
  setFavoriteChar,
  autocompleteList,
  setAutocompleteList,
}) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AllCharactersPage
              disconnectModal={disconnectModal}
              setDirectionCard={setDirectionCard}
              directionCard={directionCard}
              loginModal={loginModal}
              signModal={signModal}
              token={token}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              setLoginModal={setLoginModal}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route
          path="/:characterId"
          element={
            <CharacterPage
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              token={token}
              loginModal={loginModal}
              setLoginModal={setLoginModal}
              signModal={signModal}
              disconnectModal={disconnectModal}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <AllComicsPage
              disconnectModal={disconnectModal}
              setDirectionCard={setDirectionCard}
              directionCard={directionCard}
              loginModal={loginModal}
              signModal={signModal}
              token={token}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              setLoginModal={setLoginModal}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicPage
              loginModal={loginModal}
              signModal={signModal}
              token={token}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              setLoginModal={setLoginModal}
              disconnectModal={disconnectModal}
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
