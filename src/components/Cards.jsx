import Card from "./Card";

export default function Cards({
  data,
  path,
  favoriteChar,
  setFavoriteChar,
  favoriteComics,
  setFavoriteComics,
  loginModal,
  setLoginModal,
  signModal,
  favoriteSort,
  token,
  setAutocompleteList,
  directionCard,
  disconnectModal,
  setMenu,
}) {
  return (
    <main
      className={
        directionCard === "to right"
          ? "cards-bloc"
          : "cards-bloc cards-bloc__reverse"
      }
    >
      {data.results ? (
        data.results.map((element, index) => {
          let picture = `${element.thumbnail.path}/portrait_large.${element.thumbnail.extension}`;
          return (
            <Card
              numberCard={`${index + 1}`}
              setMenu={setMenu}
              key={element._id}
              picture={picture}
              element={element}
              path={path}
              favoriteChar={favoriteChar}
              setFavoriteChar={setFavoriteChar}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
              loginModal={loginModal}
              setLoginModal={setLoginModal}
              signModal={signModal}
              favoriteSort={favoriteSort}
              token={token}
              setAutocompleteList={setAutocompleteList}
              directionCard={directionCard}
              disconnectModal={disconnectModal}
            />
          );
        })
      ) : (
        <p className="cards-bloc__empty">Sorry but nothing is find</p>
      )}
    </main>
  );
}
