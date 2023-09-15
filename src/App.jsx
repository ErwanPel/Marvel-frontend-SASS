import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import AllCharactersPage from "./pages/AllCharactersPage";
import Header from "./components/Header";
import CharacterPage from "./pages/CharacterPage";
import ComicPage from "./pages/ComicPage";
import AllComicsPage from "./pages/AllComicsPage";

import "./assets/scss/App.css";

import {
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faBars,
  faXmark,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Modal from "./components/Modal";

library.add(
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faHeart,
  faBars,
  faXmark,
  faArrowLeft
);

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteChar, setFavoriteChar] = useState([]);
  const [autocompleteList, setAutocompleteList] = useState(false);
  const [directionCard, setDirectionCard] = useState("to right");

  console.log("ici", favoriteChar);
  return (
    <Router>
      <Header
        setDirectionCard={setDirectionCard}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        signModal={signModal}
        setSignModal={setSignModal}
        token={token}
        setToken={setToken}
        favoriteComics={favoriteComics}
        setFavoriteComics={setFavoriteComics}
        favoriteChar={favoriteChar}
        setFavoriteChar={setFavoriteChar}
        setAutocompleteList={setAutocompleteList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AllCharactersPage
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
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <AllComicsPage
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
              autocompleteList={autocompleteList}
              setAutocompleteList={setAutocompleteList}
            />
          }
        />
      </Routes>
      {loginModal && (
        <Modal
          loginModal={loginModal}
          setLoginModal={setLoginModal}
          setToken={setToken}
        />
      )}
      {signModal && (
        <Modal
          signModal={signModal}
          setSignModal={setSignModal}
          setToken={setToken}
        />
      )}
    </Router>
  );
}

export default App;
