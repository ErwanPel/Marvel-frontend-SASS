import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import { motion } from "framer-motion";

export default function AllComicsPage({
  loginModal,
  signModal,
  token,
  setLoginModal,
  favoriteComics,
  setFavoriteComics,
  autocompleteList,
  setAutocompleteList,
  directionCard,
  setDirectionCard,
  disconnectModal,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectPage, setSelectPage] = useState();

  const controller = new AbortController();

  useEffect(() => {
    // This useEffect contain the fetchFav function which obtain the list
    // of the favorites comics from the database in the state favoriteComics
    const fetchFav = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
          { headers: { authorization: `Bearer ${token}` } }
        );

        if (response.data.comics !== undefined) {
          setFavoriteComics(response.data.comics);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFav();
  }, [token]);

  useEffect(() => {
    // This useEffect send a request to get all comics from the API.
    // The limit is 100 comics by page.
    const fetchData = async () => {
      try {
        let title = "";

        // the "if condition" contain the search from the searchBar for precise the
        // list of the comics
        if (search) {
          title = `&title=${search}`;
        }
        const { data } = await axios.get(
          `https://site--marvel-backend--fwddjdqr85yq.code.run/comics?page=${page}${title}`,
          { signal: controller.signal }
        );
        setData(data);
        setSelectPage(Array.from(Array(Math.ceil(data.count / 100)).keys()));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        controller.abort();
      }
    };
    console.log("useEffect characters activated");
    fetchData();
    console.log("ici", data);
    if (data.length > 0) {
      return () => {
        controller.abort();
      };
    }
  }, [search, page, favoriteComics]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        transition: 1000,
        rotateY: -70,
        translateX: -350,
        transformOrigin: -200,
        opacity: 0,
        transition: {
          duration: 0.7,
          delay: 0.5,
        },
      }}
    >
      {isLoading ? (
        <p className="wrapper">Downloading ...</p>
      ) : (
        <>
          <SearchBar
            disconnectModal={disconnectModal}
            data={data}
            search={search}
            setSearch={setSearch}
            label="Recherche par comics 📕 :"
            placeholder="ex : spider-man, 100#, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
            loginModal={loginModal}
            signModal={signModal}
            autocompleteList={autocompleteList}
            setAutocompleteList={setAutocompleteList}
          />

          <Cards
            directionCard="to left"
            data={data}
            favoriteComics={favoriteComics}
            setFavoriteComics={setFavoriteComics}
            loginModal={loginModal}
            signModal={signModal}
            path={/comic/}
            favoriteSort={favoriteComics}
            setLoginModal={setLoginModal}
            disconnectModal={disconnectModal}
            token={token}
            setAutocompleteList={setAutocompleteList}
          />
        </>
      )}
    </motion.div>
  );
}
