import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios
      .post("https://dev.oppi.live/api/admin/v1/auth/signout")
      .then((respon) => {
        if (respon.status === 200) {
          localStorage.removeItem("AdminAccessToken");
          localStorage.removeItem("CACHED_URL");
          localStorage.removeItem("idPollDetail");
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
      <div className="navbar-home">
      <Button to="/" 
      className="navbar-logout"
      onClick={handleLogOut}> Log out</Button>
      </div>
)}

export default NavBar;
