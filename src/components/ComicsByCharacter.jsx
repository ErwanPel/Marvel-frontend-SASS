import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useModalContext } from "../context/ModalContext";

export default function ComicsByCharacter({ characterId, setMenu }) {
  const [comicData, setComicData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { signModal, loginModal } = useModalContext();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/comics/${characterId}`
      );
      setComicData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="comics-window">
      {comicData?.comics === undefined ? (
        <p lang="en" className="to-complete">
          Oups there a technical problem
        </p>
      ) : comicData?.comics.length === 0 ? (
        <p lang="en" className="to-complete">
          Pas de comics
        </p>
      ) : (
        comicData.comics.map((comic) => {
          return (
            <Link
              lang="en"
              label-aria={`go to the article of ${comic.title}`}
              tabIndex={(signModal || loginModal) && "-1"}
              key={comic._id}
              className="biography-comic"
              to={`/comic/${comic._id}`}
              state={{
                data: comic,
                from: `/characters/${characterId}`,
                back: true,
              }}
              onClick={() => setMenu(false)}
            >
              <img
                src={`${comic.thumbnail.path}/portrait_small.${comic.thumbnail.extension}`}
                alt={`image du comic ${comic.title}`}
              />{" "}
              <h5 lang="en">{comic.title}</h5>
            </Link>
          );
        })
      )}
    </div>
  );
}
