import "./Login.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import clientPath from "../../constants/clientPath";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setErrorMessage, loginRequest } from "./reducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { REQUEST_STATUS } from "../../constants/status";
import { ACCESS_TOKEN } from "../../constants/localStorage";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});
const Login = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, loginStatus } = useAppSelector((state) => state.login);

  let navigate = useNavigate();

  const handleLogin = () => {
    const Token = localStorage.getItem(ACCESS_TOKEN);
    if (Token && loginStatus === REQUEST_STATUS.SUCCESS) {
      navigate(clientPath.POLLLIST);
    } else navigate(clientPath.LOGIN);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  useEffect(() => {
    handleLogin();
  }, [loginStatus]);
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
          {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : ""}
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
