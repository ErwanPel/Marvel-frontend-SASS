import Logo from "../assets/img/LogoMarvel.webp";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({
  loginModal,
  setLoginModal,
  signModal,
  setSignModal,
  token,
  setToken,
  setFavoriteChar,
  setFavoriteComics,
  setAutocompleteList,
  setDirectionCard,
  setDisconnectModal,
  menu,
  setMenu,
}) {
  const navigate = useNavigate();

  const getSignUp = () => {
    setMenu(() => false);
    setAutocompleteList(false);
    setSignModal(!signModal);
  };

  const getLogin = () => {
    setMenu(() => false);
    setAutocompleteList(false);
    setLoginModal(!loginModal);
  };

  const removeToken = () => {
    setMenu(() => false);
    Cookies.remove("token");
    setFavoriteChar([]);
    setFavoriteComics([]);
    setDisconnectModal(true);
    setMenu(false);
    setTimeout(() => {
      setDisconnectModal(false);
    }, 2000);
    setToken("");
  };

  return (
    <header className="header">
      <Link
        to="/"
        onClick={() => {
          setMenu(false);
          setDirectionCard("to right");
        }}
      >
        <img src={Logo} alt="Logo marvel écrit en blanc sur fond rouge" />
      </Link>
      <nav>
        <button
          className="header__button"
          onClick={() => {
            setMenu(false);
            setDirectionCard("to right");
            navigate("/");
          }}
        >
          PERSONNAGES
        </button>

        <button
          className="header__button"
          onClick={() => {
            setMenu(false);
            setDirectionCard("to left");
            navigate("/comics");
          }}
        >
          COMICS
        </button>
      </nav>
      <div className="menu">
        <FontAwesomeIcon
          className="menu__icon"
          icon="bars"
          onClick={() => setMenu(!menu)}
          onMouseEnter={() => setMenu(true)}
        />
        {menu && (
          <div className="bloc-menu" onMouseLeave={() => setMenu(() => false)}>
            {!token ? (
              <>
                <div className="bloc-menu__item" onClick={getSignUp}>
                  S'inscrire
                </div>
                <div className="bloc-menu__item" onClick={getLogin}>
                  Connexion
                </div>
              </>
            ) : (
              <div className="bloc-menu__item" onClick={removeToken}>
                Deconnexion
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
