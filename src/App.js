import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import NavBar from "./NavBar/NavBar";
import PollList from "./Components/PollList/PollList";
import PollDetail from "./Components/PollDetail/PollDetail";


function App() {

  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/polllist" element={ <PollList />} />
          <Route path="/polldetail" element={ <PollDetail />} />
          <Route path="/navbar" element={ <NavBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
