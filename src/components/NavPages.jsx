import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../context/ModalContext";

export default function NavPage({ page, setPage, selectPage, setMenu }) {
  const { signModal, loginModal } = useModalContext();

  const changePage = (direction) => {
    setMenu(false);
    setPage(direction);
  };

  return (
    <nav aria-label="page navigation" className="navpage">
      <FontAwesomeIcon
        aria-hidden={false}
        aria-label="go to the first page"
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="angles-left"
        onClick={() => changePage(1)}
        onKeyUp={(event) => event.code === "Enter" && changePage(1)}
      />
      <FontAwesomeIcon
        aria-hidden={false}
        aria-label="go to the previous page"
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="chevron-left"
        onClick={() => changePage(page - 1)}
        onKeyUp={(event) => event.code === "Enter" && changePage(page - 1)}
      />
      <select
        aria-label="select your page with the arrows or on press 'Enter'"
        name="page"
        id="page"
        onChange={(event) => {
          setMenu(false);
          setPage(event.target.value);
        }}
        value={page}
        tabIndex={signModal || loginModal ? "-1" : "0"}
      >
        {selectPage.map((element, index) => {
          return (
            <option key={element} value={index + 1}>{`Page ${
              index + 1
            } `}</option>
          );
        })}
      </select>

      <FontAwesomeIcon
        aria-hidden={false}
        aria-label="go to the next page"
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="chevron-right"
        onClick={() => changePage(page + 1)}
        onKeyUp={(event) => event.code === "Enter" && changePage(page + 1)}
      />

      <FontAwesomeIcon
        aria-hidden={false}
        aria-label="go to the last page"
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="angles-right"
        onClick={() => changePage(selectPage.length)}
        onKeyUp={(event) =>
          event.code === "Enter" && changePage(selectPage.length)
        }
      />
    </nav>
  );
}
