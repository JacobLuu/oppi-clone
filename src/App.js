import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import NavBar from "./NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/login" element={ <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;