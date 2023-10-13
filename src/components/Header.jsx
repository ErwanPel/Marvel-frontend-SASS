import Logo from "../assets/img/LogoMarvel.webp";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useModalContext } from "../context/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({
  token,
  setToken,
  setFavoriteChar,
  setFavoriteComics,
  setAutocompleteList,
  setDirectionCard,
  menu,
  setMenu,
}) {
  const navigate = useNavigate();

  const {
    setSignModal,
    signModal,
    setLoginModal,
    loginModal,
    setDisconnectModal,
  } = useModalContext();

  const goToComics = (event) => {
    setMenu(false);
    setDirectionCard("to left");
    navigate("/comics");
  };

  const goToCharacters = (event) => {
    setMenu(false);
    setDirectionCard("to right");
    navigate("/characters");
  };

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
        }}
        tabIndex={(signModal || loginModal) && "-1  "}
      >
        <img src={Logo} alt="Logo marvel écrit en blanc sur fond rouge" />
      </Link>
      <nav aria-label="main navigation">
        <button
          aria-label="go to the all characters page"
          className="header__button"
          onClick={() => goToCharacters()}
          onKeyUp={(event) => {
            event.code === "Enter" && goToCharacters();
          }}
          tabIndex={(signModal || loginModal) && "-1  "}
        >
          PERSONNAGES
        </button>

        <button
          aria-label="go to the all comics page"
          className="header__button"
          onClick={goToComics}
          onKeyUp={(event) => {
            event.code === "Enter" && goToComics();
          }}
          tabIndex={(signModal || loginModal) && "-1"}
        >
          COMICS
        </button>
      </nav>
      <bouton
        className="menu"
        aria-haspopup="menu"
        aria-controls="bloc-menu"
        aria-expanded
        tabIndex={signModal || loginModal ? "-1" : "0"}
        onClick={() => setMenu(!menu)}
        onMouseEnter={() => setMenu(true)}
        onKeyUp={(event) => {
          event.code === "Enter" && setMenu(!menu);
        }}
      >
        <FontAwesomeIcon
          aria-hidden={false}
          className="menu__icon"
          icon="bars"
        />
        {menu && (
          <div className="bloc-menu" onMouseLeave={() => setMenu(() => false)}>
            {!token ? (
              <>
                <div
                  aria-label="open the window for sign in"
                  tabIndex={0}
                  className="bloc-menu__item"
                  onClick={getSignUp}
                  onKeyUp={(event) => {
                    event.code === "Enter" && getSignUp();
                  }}
                >
                  S'inscrire
                </div>
                <div
                  aria-label="open the window for log in"
                  tabIndex={0}
                  className="bloc-menu__item"
                  onClick={getLogin}
                  onKeyUp={(event) => {
                    event.code === "Enter" && getLogin();
                  }}
                >
                  Connexion
                </div>
              </>
            ) : (
              <>
                <div
                  aria-label="go to your favorites page"
                  tabIndex={0}
                  className="bloc-menu__item"
                  onClick={() => navigate("/favorites")}
                  onKeyUp={(event) => {
                    event.code === "Enter" && navigate("/favorites");
                  }}
                >
                  Favoris
                </div>
                <div
                  aria-label="disconnect your session"
                  tabIndex={0}
                  className="bloc-menu__item"
                  onClick={removeToken}
                  onKeyUp={(event) => {
                    event.code === "Enter" && removeToken();
                  }}
                >
                  Deconnexion
                </div>
              </>
            )}
          </div>
        )}
      </bouton>
    </header>
  );
}
