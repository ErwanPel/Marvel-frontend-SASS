import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage({ setUserError, setLoginModal, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const enableButton = () => {
      const reg = /^[\w\.\-]+[\w\.\-]*@[\w\.\-]{2,}\.[a-z_\.\-]+[a-z_\-]+$/;
      console.log("ici", reg.test(email));
      console.log(agree, email, password);
      if (reg.test(email) === true && password) {
        setAgree(true);
      } else {
        setAgree(false);
      }
    };
    enableButton();
  }, [email, password]);

  const handleChange = (setState, event) => {
    setError("");
    setUserError(false);
    setState(event.target.value);
  };

  const fetchData = async (data) => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--fwddjdqr85yq.code.run/login",
        data
      );

      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(() => response.data.token);
      setSuccess(true);
      setTimeout(() => setLoginModal(() => false), 3000);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message) {
        setUserError(true);
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reg = /^[\w\.\-]+[\w\.\-]*@[\w\.\-]{2,}\.[a-z_\.\-]+[a-z_\-]+$/;

    if (reg.test(email) === true) {
      fetchData({
        email,
        password,
      });
    } else {
      setError("This adress mail is not valid");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Connexion</h3>

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
      {success && <p className="success-message">You are connected :)</p>}
      {error && <p className="error-message">{error}</p>}
      <button className={agree && "button__valid"}>Se connecter</button>
    </form>
  );
}
