import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignPage({ setSignModal, setToken, setUserError }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [power, setPower] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (setState, event) => {
    setUserError(false);
    setError("");
    setState(event.target.value);
  };

  useEffect(() => {
    const enableButton = () => {
      const reg = /^[\w\.\-]+[\w\.\-]*@[\w\.\-]{2,}\.[a-z_\.\-]+[a-z_\-]+$/;
      console.log("ici", reg.test(email));
      console.log(agree, email, password);
      if (
        reg.test(email) === true &&
        username &&
        password &&
        confirmPassword &&
        power
      ) {
        setAgree(true);
      } else {
        setAgree(false);
      }
    };
    enableButton();
  }, [email, password, confirmPassword, username, power]);

  const fetchData = async (data) => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--fwddjdqr85yq.code.run/signup",
        data
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(() => response.data.token);
      setSuccess(true);
      setTimeout(() => setSignModal(false), 3000);
    } catch (error) {
      console.log(error.response);
      if (
        error.response.data.message.match(
          "E11000 duplicate key error collection: marvel.users index: email_1 dup key:"
        )
      ) {
        setUserError(true);
        setError("This adress mail is already used");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reg = /^[\w\.\-]+[\w\.\-]*@[\w\.\-]{2,}\.[a-z_\.\-]+[a-z_\-]+$/;

    if (reg.test(email) === true) {
      if (confirmPassword === password) {
        fetchData({
          username,
          email,
          password,
          power,
        });
      } else {
        setError("Les deux mots de passe ne sont pas identiques !");
      }
    } else {
      setError("This adress mail is not valid");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Inscription</h3>
      <div className="inputBloc">
        <label htmlFor="name">Ton nom :</label>
        <input
          type="text"
          name="name"
          id="name"
          required={true}
          onChange={(event) => handleChange(setUserName, event)}
          value={username}
        />
      </div>
      <div className="inputBloc">
        <label htmlFor="email">Ton email :</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          onChange={(event) => handleChange(setEmail, event)}
          value={email}
        />
      </div>
      <div className="inputBloc">
        <label htmlFor="password">Ton mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          required={true}
          onChange={(event) => handleChange(setPassword, event)}
          value={password}
        />
      </div>
      <div className="inputBloc">
        <label htmlFor="confirmPassword">Confirme mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required={true}
          onChange={(event) => handleChange(setConfirmPassword, event)}
          value={confirmPassword}
        />
      </div>
      <div className="inputBloc">
        <label htmlFor="power">Quel serait ton pouvoir :</label>
        <input
          type="text"
          name="power"
          id="power"
          required={true}
          onChange={(event) => handleChange(setPower, event)}
          value={power}
        />
      </div>
      {success && (
        <p className="success-message">Your registration is successful :)</p>
      )}
      {error && <p className="error-message">{error}</p>}
      {success ? (
        <button className="button__valid" onClick={() => setSignModal(false)}>
          Fermer
        </button>
      ) : (
        <button className={agree && "button__valid"}>S'inscrire</button>
      )}
    </form>
  );
}
