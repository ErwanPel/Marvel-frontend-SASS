import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

export default function CharactersPage({
  loginModal,
  signModal,
  token,
  favoriteChar,
  setFavoriteChar,
  setLoginModal,
  autocompleteList,
  setAutocompleteList,
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
    // of the favorites characters from the database in the state favoriteChar

    const fetchFav = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--fwddjdqr85yq.code.run/favorites",
          { headers: { authorization: `Bearer ${token}` } }
        );

        if (response.data.characters !== undefined) {
          setFavoriteChar(response.data.characters);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFav();
  }, [token]);

  useEffect(() => {
    // This useEffect send a request to get all the characters from the API.
    // The limit is 100 characters by page.

    const fetchData = async () => {
      try {
        let name = "";

        // the "if condition" contain the search from the searchBar for precise the
        // list of the characters
        if (search) {
          name = `&name=${search}`;
        }
        const { data } = await axios.get(
          `https://site--marvel-backend--fwddjdqr85yq.code.run/characters?page=${page}${name}`,
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

    fetchData();
    if (data.length > 0) {
      return () => {
        controller.abort();
      };
    }
  }, [search, page]);

  return (
    <motion.div
      className="page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        rotateY: 0,
        translateX: 0,
        transformOrigin: 0,
      }}
      exit={{
        rotateY: -70,
        rotateX: 30,
        translateX: 1200,
        translateY: 20,
        transformOrigin: 100,
        borderColor: "white",
        boxShadow: "white",
        opacity: 0,
        transition: {
          duration: 1,
          delay: 0.5,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar
            disconnectModal={disconnectModal}
            data={data}
            search={search}
            setSearch={setSearch}
            label="Recherche par personnages 🦸‍♂️ :"
            placeholder="ex : spider-man, iron man, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
            loginModal={loginModal}
            signModal={signModal}
            autocompleteList={autocompleteList}
            setAutocompleteList={setAutocompleteList}
          />
          <Cards
            directionCard="to right"
            data={data}
            favoriteChar={favoriteChar}
            setFavoriteChar={setFavoriteChar}
            loginModal={loginModal}
            setLoginModal={setLoginModal}
            signModal={signModal}
            disconnectModal={disconnectModal}
            path="/"
            favoriteSort={favoriteChar}
            token={token}
            setAutocompleteList={setAutocompleteList}
          />
        </>
      )}
    </motion.div>
  );
}
