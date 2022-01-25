import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
  const [user,setUser] = useState(null);
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Poll List </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user}  </span> </p>
        <Link to="/logout" className="navbar-logout"> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/polldetail" className="navbar-login"> Poll Detail</Link>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
