import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import StickyTopBar from "../components/StickyTopBar";

export default function CharactersPage({
  token,
  favoriteChar,
  setFavoriteChar,
  autocompleteList,
  setAutocompleteList,
  setMenu,
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
      // the className Page is on the "cards.scss" file
      className="page"
      initial={{
        opacity: 0,
        rotateY: -110,
        rotateX: 20,
        translateX: 2200,
        translateY: -100,
        transformOrigin: 100,
        borderColor: "rgba(228, 228, 228, 1)",
      }}
      animate={{
        opacity: 1,
        rotateY: 0,
        rotateX: 0,
        translateX: 0,
        translateY: 0,
        transformOrigin: 100,
        borderColor: "rgba(228, 228, 228, 0)",
        transition: {
          duration: 1.2,
          delay: 1.6,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
      exit={{
        rotateY: -70,
        rotateX: 15,
        translateX: 1200,
        translateY: -100,
        transformOrigin: 100,
        borderColor: "rgba(228, 228, 228, 1)",
        opacity: 0,
        transition: {
          duration: 0.8,

          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StickyTopBar
            directionCard="to right"
            setMenu={setMenu}
            data={data}
            search={search}
            setSearch={setSearch}
            label="Recherche par personnages 🦸‍♂️ :"
            placeholder="ex : spider-man, iron man, ..."
            page={page}
            setPage={setPage}
            selectPage={selectPage}
            autocompleteList={autocompleteList}
            setAutocompleteList={setAutocompleteList}
          />
          <Cards
            setMenu={setMenu}
            directionCard="to right"
            data={data}
            favoriteChar={favoriteChar}
            setFavoriteChar={setFavoriteChar}
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
