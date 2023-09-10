import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchBar({
  data,
  search,
  setSearch,
  label,
  placeholder,
  page,
  setPage,
  selectPage,
  loginModal,
  signModal,
  autocompleteList,
  setAutocompleteList,
}) {
  const [hasFocus, setFocus] = useState(false);

  console.log(data);

  // Initialization of an array for the autocomplete searchBar
  let arrayAutocomplete = [];

  if (data?.results) {
    data.results.map((item) => {
      // for research marvel's characters
      if (item.name) {
        arrayAutocomplete.push(item.name.split("(")[0].trim());
        //for research marvel's comics
      } else {
        arrayAutocomplete.push(item.title.split("(")[0].trim());
      }

      let sortArray = new Set(arrayAutocomplete);
      arrayAutocomplete = Array.from(sortArray);
    });
  }

  const getItem = (item) => {
    setSearch(() => item);
    setAutocompleteList(false);
  };

  return (
    <div
      className={
        loginModal || signModal ? "searchbar" : "searchbar sticky-bloc"
      }
      onClick={() => setAutocompleteList(false)}
    >
      <nav className="navbar">
        <div className="navsearch">
          <label htmlFor="search">{label}</label>
          <div className="navsearch__autocomplete-bloc">
            <input
              type="text"
              name="search"
              id="search"
              placeholder={placeholder}
              onChange={(event) => {
                setAutocompleteList(true);
                setSearch(event.target.value);
                setPage(1);
              }}
              value={search}
            />
            {autocompleteList && (
              <div className="autocomplete-list">
                {arrayAutocomplete.map((item, index) => {
                  let regex = new RegExp(search, "i");

                  if (search.length > 0) {
                    if (item.match(regex)) {
                      return (
                        <div
                          tabIndex={0}
                          className="item"
                          key={index}
                          onClick={() => getItem(item)}
                          onFocus={() => setFocus(() => true)}
                          onBlur={() => setFocus(() => false)}
                          onKeyUp={(event) => {
                            event.code === "Enter" && getItem(item);
                          }}
                        >
                          {item}
                        </div>
                      );
                    }
                  }
                })}
              </div>
            )}
          </div>
        </div>
        <div className="navpage">
          <FontAwesomeIcon
            className={page > 1 ? "navpage__chevron" : "navpage__unvisible"}
            icon="angles-left"
            onClick={() => setPage(1)}
          />
          <FontAwesomeIcon
            className={page > 1 ? "navpage__chevron" : "navpage__unvisible"}
            icon="chevron-left"
            onClick={() => setPage(page - 1)}
          />
          <select
            name="page"
            id="page"
            onChange={(event) => setPage(event.target.value)}
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
                ? "navpage__chevron"
                : "navpage__unvisible"
            }
            icon="chevron-right"
            onClick={() => setPage(page + 1)}
          />

          <FontAwesomeIcon
            className={
              page < selectPage.length
                ? "navpage__chevron"
                : "navpage__unvisible"
            }
            icon="angles-right"
            onClick={() => setPage(selectPage.length)}
          />
        </div>
      </nav>
    </div>
  );
}
