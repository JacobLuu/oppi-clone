import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom"

async function loginUser(credentials) {
  // cách 1
  return await axios.post("https://dev.oppi.live/api/admin/v1/auth/signin",credentials)
  .then((res)=>{
    localStorage.setItem('token',res.data.token);
  }).catch(e=>console.log(e))
  //cách 2:
  // return fetch("https://dev.oppi.live/api/admin/v1/auth/signin", {
  //   method: "POST",
  //   // headers: {
  //   //   "Content-Type": "application/json",
  //   // },
  //   //body: JSON.stringify(credentials),
  // }).then((data) => {
  //   console.log('data', data);
  //   localStorage.setItem('accessToken', data.data.token );
  // });
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    axios.post("https://dev.oppi.live/api/admin/v1/auth/signin", data)
          .then((res)=>{
            if(res.status === 200){
              setErrorMessage("");
              async function setToken(){
                sessionStorage.setItem("AdminAccessToken",res.data.token);
              }
              setToken().then(()=>{
                navigate("/polllist")
              })
            }
          })
          .catch((e) => {
            console.log("Fail to Sign In");
            if(e.response.data.message=== "Incorrect username or password") {
              setErrorMessage("Email or password is invalid, please try again.")
            }
            else{
              setErrorMessage(' ')
            }
        });
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
