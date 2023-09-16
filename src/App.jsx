import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";

import "./assets/css/App.css";

import {
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faBars,
  faXmark,
  faArrowLeft,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Modal from "./components/Modal";
import RouteChild from "./components/RoutesChild";

library.add(
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
  faHeart,
  faBars,
  faXmark,
  faArrowLeft,
  faCircleNotch
);

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signModal, setSignModal] = useState(false);
  const [disconnectModal, setDisconnectModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteChar, setFavoriteChar] = useState([]);
  const [menu, setMenu] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState(false);
  const [directionCard, setDirectionCard] = useState("to right");

  return (
    <Router>
      <Header
        menu={menu}
        setMenu={setMenu}
        setDisconnectModal={setDisconnectModal}
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
      <RouteChild
        setMenu={setMenu}
        autocompleteList={autocompleteList}
        disconnectModal={disconnectModal}
        directionCard={directionCard}
        setDirectionCard={setDirectionCard}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        signModal={signModal}
        token={token}
        favoriteComics={favoriteComics}
        setFavoriteComics={setFavoriteComics}
        favoriteChar={favoriteChar}
        setFavoriteChar={setFavoriteChar}
        setAutocompleteList={setAutocompleteList}
      />
      {loginModal && (
        <Modal
          loginModal={loginModal}
          setLoginModal={setLoginModal}
          setToken={setToken}
          setSignModal={setSignModal}
        />
      )}
      {signModal && (
        <Modal
          signModal={signModal}
          setSignModal={setSignModal}
          setToken={setToken}
          setLoginModal={setLoginModal}
        />
      )}
      {disconnectModal && (
        <Modal
          setDisconnectModal={setDisconnectModal}
          disconnectModal={disconnectModal}
        />
      )}
    </Router>
  );
}

export default App;
