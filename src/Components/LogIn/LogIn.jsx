import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("https://dev.oppi.live/api/admin/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    console.log('data', data);
    data.json()
  });
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    loginUser(data)
  };

  return (
    <section className="login-container">
      <div className="login-title">Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>EMAIL ADDRESS</label>
        <input
          name="email"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setEmail(e.target.value)}
          {...register("email", { required: true })}
        />
        <label>PASSWORD</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          Sign in
        </button>
      </form>
      <div className="login-register"> Forgot Password? </div>
      <Link className="login-register-link" to="/register">
        Create new account
      </Link>
    </section>
  );
};

export default Login;
