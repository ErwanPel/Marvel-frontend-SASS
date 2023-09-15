import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage({ loginModal, setLoginModal, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const enableButton = () => {
      const reg = /^[\w\.\-]+[\w\.\-]*@[\w\.\-]{2,}\.[a-z_\.\-]+[a-z_\-]+$/;
      console.log(agree, email, password);
      if (reg.test(email) === true && password) {
        console.log("c'est bon");
        setAgree(true);
      } else {
        console.log("c'est pas bon");
        setAgree(false);
      }
    };
    enableButton();
  }, [email, password]);

  const handleChange = (setState, event) => {
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
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchData({
      email,
      password,
    });
    setLoginModal(() => false);
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
      <button className={agree && "button__valid"}>Se connecter</button>
    </form>
  );
}
