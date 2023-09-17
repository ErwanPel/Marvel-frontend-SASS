import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import StickyTopBar from "../components/StickyTopBar";

export default function AllComicsPage({
  loginModal,
  signModal,
  token,
  setLoginModal,
  favoriteComics,
  setFavoriteComics,
  autocompleteList,
  setAutocompleteList,
  disconnectModal,
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
      // the className Page is on the "cards.scss" file
      className="page"
      initial={{
        opacity: 0,
        rotateY: 80,
        rotateX: 10,
        translateX: -650,
        translateY: -100,
        transformOrigin: -200,
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
          duration: 0.8,
          delay: 1.2,
          ease: [0.43, 0.04, 0.84, 0.52],
        },
      }}
      exit={{
        rotateY: 80,
        rotateX: 10,
        translateX: -650,
        translateY: -100,
        transformOrigin: -200,
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
            directionCard="to left"
            setMenu={setMenu}
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
            setMenu={setMenu}
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
