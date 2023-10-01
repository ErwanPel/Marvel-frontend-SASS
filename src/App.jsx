import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import Cookies from "js-cookie";
import { useModalContext } from "./context/ModalContext";

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
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [favoriteChar, setFavoriteChar] = useState([]);
  const [menu, setMenu] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState(false);
  const [directionCard, setDirectionCard] = useState("to right");

  const { loginModal, signModal, disconnectModal } = useModalContext();

  return (
    <Router>
      <Header
        menu={menu}
        setMenu={setMenu}
        setDirectionCard={setDirectionCard}
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
        directionCard={directionCard}
        setDirectionCard={setDirectionCard}
        token={token}
        favoriteComics={favoriteComics}
        setFavoriteComics={setFavoriteComics}
        favoriteChar={favoriteChar}
        setFavoriteChar={setFavoriteChar}
        setAutocompleteList={setAutocompleteList}
      />
      {loginModal && <Modal setToken={setToken} />}
      {signModal && <Modal setToken={setToken} />}
      {disconnectModal && <Modal />}
    </Router>
  );
}

export default App;
