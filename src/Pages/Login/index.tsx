import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import authService from "../../Services/auth.services";

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  //destructuring the authContext Object
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    //if ypu submit something on react you have to requestbody
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        //authenticate user
        authenticateUser();
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <br></br>
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <br></br>
        <label>Password:</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br></br>
        <button type="submit">Login</button>
      </form>
      {/*       {errorMessage && <p className="error-message">{errorMessage}</p>} */}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LogInPage;
