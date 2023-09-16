import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavPage({ page, setPage, selectPage, setMenu }) {
  return (
    <div className="navpage">
      <FontAwesomeIcon
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="angles-left"
        onClick={() => {
          setMenu(false);
          setPage(1);
        }}
      />
      <FontAwesomeIcon
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="chevron-left"
        onClick={() => {
          setMenu(false);
          setPage(page - 1);
        }}
      />
      <select
        name="page"
        id="page"
        onChange={(event) => {
          setMenu(false);
          setPage(event.target.value);
        }}
        value={page}
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
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="chevron-right"
        onClick={() => {
          setMenu(false);
          setPage(page + 1);
        }}
      />

      <FontAwesomeIcon
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="angles-right"
        onClick={() => {
          setMenu(false);
          setPage(selectPage.length);
        }}
      />
    </div>
  );
}
