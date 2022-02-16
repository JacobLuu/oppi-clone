import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clientPath from "../../constants/clientPath";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required!'),
  password: yup.string().required('Password is required!'),
});
const Login = ({ setToken }) => {

  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => {
    axios
      .post("https://dev.oppi.live/api/admin/v1/auth/signin", data)
      .then((res) => {
        if (res.status === 200) {
          setErrorMessage("");
          async function setToken() {
            localStorage.setItem("AdminAccessToken", res.data.token);
          }
          setToken().then(() => {
            navigate(clientPath.POLLLIST);
          });
        }
      })
      .catch((e) => {
        if (e.response.data.message === "Incorrect username or password") {
          setErrorMessage("Email or password is invalid, please try again.");
        } else {
          setErrorMessage(" ");
        }
      });

  };
  return (
    <div className="container">
    <section className="login-container">
      <div className="login-title">Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>EMAIL ADDRESS</label>
        <input
          className="form-control"
          name="email"
          type="text"
          placeholder="Enter your username"
          {...register("email")}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
        <label>PASSWORD</label>
        <input
          className="form-control"
          name="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        {errorMessage? <p style={{ color: "red" }}>{errorMessage}</p>:""}
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          Sign in
        </button>
      </form>
      <div className="login-register"> Forgot Password? </div>
      <Link className="login-register-link" to="/register">
        Create new account
      </Link>
    </section>
    </div>
  );
};

export default Login;
