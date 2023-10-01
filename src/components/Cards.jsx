import Card from "./Card";

export default function Cards({
  data,
  path,
  favoriteChar,
  setFavoriteChar,
  favoriteComics,
  setFavoriteComics,
  favoriteSort,
  token,
  setAutocompleteList,
  directionCard,
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
              favoriteSort={favoriteSort}
              token={token}
              setAutocompleteList={setAutocompleteList}
              directionCard={directionCard}
            />
          );
        })
      ) : (
        <p className="cards-bloc__empty">Sorry but nothing is find</p>
      )}
    </main>
  );
}
