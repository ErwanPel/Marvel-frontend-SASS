import { useState } from "react";
import { useModalContext } from "../context/ModalContext";

export default function Search({
  search,
  setSearch,
  label,
  autocompleteList,
  setAutocompleteList,
  setPage,
  placeholder,
  data,
  setMenu,
}) {
  const [hasFocus, setFocus] = useState(false);

  const { signModal, loginModal } = useModalContext();

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
    <div className="navsearch">
      <label htmlFor="search">{label}</label>
      <div className="autocomplete-bloc">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          onFocus={() => setMenu(() => false)}
          onChange={(event) => {
            setAutocompleteList(true);
            setSearch(event.target.value);
            setPage(1);
          }}
          value={search}
          tabIndex={signModal || loginModal ? "-1" : "0"}
        />
        {autocompleteList && (
          <div className="autocomplete">
            {arrayAutocomplete.map((item, index) => {
              let regex = new RegExp(search, "i");

              if (search.length > 0) {
                if (item.match(regex)) {
                  return (
                    <div
                      tabIndex={0}
                      className="autocomplete__item"
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
  );
}
