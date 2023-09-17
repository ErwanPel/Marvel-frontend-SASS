import Search from "./Search";
import NavPages from "./NavPages";

export default function StickyTopBar({
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
  disconnectModal,
  setMenu,
  directionCard,
}) {
  return (
    <div
      className={
        loginModal || signModal || disconnectModal
          ? "searchbar"
          : "searchbar sticky-bloc"
      }
      onClick={() => setAutocompleteList(false)}
    >
      <nav
        className={
          directionCard === "to right"
            ? "navbar navbar__right"
            : "navbar navbar__left"
        }
      >
        <Search
          setMenu={setMenu}
          search={search}
          setSearch={setSearch}
          label={label}
          placeholder={placeholder}
          autocompleteList={autocompleteList}
          setAutocompleteList={setAutocompleteList}
          setPage={setPage}
          data={data}
        />
        <NavPages
          page={page}
          setPage={setPage}
          selectPage={selectPage}
          setMenu={setMenu}
        />
      </nav>
    </div>
  );
}
