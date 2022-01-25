import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>USERNAME</label>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          {...register("name", { required: true })}
        />
        <label>PASSWORD</label>
        <input
          name="pas'sword"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          Login
        </button>
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free
      </Link>
    </section>
  );
};

export default Login;
