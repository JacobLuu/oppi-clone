import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import NavBar from "./NavBar/NavBar";
import PollList from "./Components/PollList/PollList";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={ <PollList />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/navbar" element={ <NavBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
