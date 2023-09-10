import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ComicsByCharacter from "../components/ComicsByCharacter";

export default function BioCharacterPage() {
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { characterId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--fwddjdqr85yq.code.run/character/${characterId}`
      );
      setCharacterData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  let picture = "";

  useEffect(() => {
    if (location.state) {
      console.log("if");
      setCharacterData(location.state.data);
      setIsLoading(false);
    } else {
      console.log("else");
      fetchData();
    }
  }, []);

  return isLoading ? (
    <p>Downloading...</p>
  ) : (
    <main>
      <h2>{characterData.name}</h2>
      <div className="biography-bloc">
        <div className="biography-bloc__left">
          {!characterData.thumbnail.path.match("image_not_available") && (
            <img
              src={`${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}`}
              alt={`image de ${characterData.name}`}
            />
          )}
          <div>
            <h3>Description</h3>
            {characterData.description ? (
              <p className="bio-description">{characterData.description}</p>
            ) : (
              <p className="to-complete">Need to be completed ! </p>
            )}
            {characterData.comics.length > 0 && (
              <p>{`${characterData.name} apparaît dans ${
                characterData.comics.length
              } comic${characterData.comics.length > 1 ? "s" : ""} !`}</p>
            )}
          </div>
        </div>
        <div className="biography-bloc__right">
          <h3>Comics</h3>
          <ComicsByCharacter characterId={characterId} />
        </div>
      </div>
    </main>
  );
}
