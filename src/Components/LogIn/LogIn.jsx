import "./Login.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    console.log(user);
  };
  //VALIDATE USERNAME
  useEffect(() => {
    let error = {};
    if (username.trim() && username.length < 4) {
      error.username = "Username required";
      console.log("username is too short");
    }
  }, [username]);
  //VALIDATE PASSWORD
  useEffect(() => {
    let error = {};
    if (password.trim() && password.length < 6) {
      error.password = "Password must be more than 6 character";
      console.log("password is too short");
    }
  }, [password]);
  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleLogin}>
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onSubmit={handleLogin}>
          {" "}
          Login{" "}
        </button>
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free{" "}
      </Link>
    </section>
  );
};

export default Login;
