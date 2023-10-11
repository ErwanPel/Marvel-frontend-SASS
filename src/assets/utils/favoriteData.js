import axios from "axios";

// This function send the favorites to save in the dataBase
const sendFav = async (data, token) => {
  try {
    const response = await axios.post(
      "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
      data,

      { headers: { authorization: `Bearer ${token}` } }
    );
    console.log("post fav", response.data);
  } catch (error) {
    console.log(error.response);
  }
};

// This function send a request for delete the favorites in the dataBase
const deleteFav = async ({ type, id, token }) => {
  try {
    const response = await axios.delete(
      `https://site--marvel-backend--fwddjdqr85yq.code.run/favorites?${type}=${id}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    console.log("post fav", response.data);
  } catch (error) {
    console.log(error.response);
  }
};

// This function is used for the comics and characters favorites and send the good
// request for the database
const handleFav = (
  favoriteComics,
  setFavoriteComics,
  favoriteChar,
  setFavoriteChar,
  id,
  favData,
  deleteFav,
  sendFav,
  token,
  event
) => {
  event.preventDefault();

  // if the data contain the "title" key, the "if condition" is taken for
  // process the favorites comic
  if (favData?.title) {
    // if the state 'favoriteComics' have already the id of the favorites element,
    // the favorites comic will be delete

    if (favoriteComics.find((find) => find._id === favData._id)) {
      deleteFav({ type: "comics", id: id, token: token });
      const cookiesArray = favoriteComics.filter(
        (del) => del._id !== favData._id
      );
      setFavoriteComics(cookiesArray);

      //the favorites is not in the state "favoriteComic", the "send fav" function
      // is taken and save the favorites comic
    } else {
      sendFav(favData, token);
      setFavoriteComics((favoriteComics) => [...favoriteComics, favData]);
    }

    // else the data contain the "name" key, the "else condition" is taken for
    // process the favorites character
  } else {
    // if the state 'favoriteChar' have already the id of the favorites element,
    // the favorites character will be delete

    if (favoriteChar.find((find) => find._id === favData._id)) {
      deleteFav({ type: "characters", id: favData._id, token });
      const cookiesArray = favoriteChar.filter(
        (del) => del._id !== favData._id
      );
      setFavoriteChar(cookiesArray);

      //the favorites is not in the state "favoriteChar", the "send fav" function
      // is taken and save the favorites character
    } else {
      sendFav(favData, token);
      setFavoriteChar((favoriteChar) => [...favoriteChar, favData]);
    }
  }
};

export { sendFav, deleteFav, handleFav };
