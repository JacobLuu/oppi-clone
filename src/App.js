import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import NavBar from "./NavBar/NavBar";
import PollList from "./Components/PollList/PollList";
import PollDetail from "./Components/PollDetail/PollDetail";
import useToken from "./Auth/useToken";

function App() {
  // const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken = {setToken} />
  // }
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={ <PollList />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/polldetail" element={ <PollDetail />} />
          <Route path="/navbar" element={ <NavBar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
