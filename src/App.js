import "./App.css";
import React , { useState} from 'react';
import Login from "./Components/LogIn/LogIn";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] =  useState("");

  const Login = details => {
    console.log(details);
  }
  const Logout = () => {
    console.log("Logout");
  }
  return (
      <div className="App">
        {(user.email != "") ? (
          <div className = "welcome">
              <h2>Welcome, <span>{user.name}</span></h2>
              <button>Logout</button>
          </div>
        ) : (
          <Login />
        )}
      </div>
  );
}

export default App;