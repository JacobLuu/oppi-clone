import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import PollList from "./Components/PollList/PollList";
import PollDetail from "./Components/PollDetail/PollDetail";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRouter";
import clientPath from "./constants/clientPath";

function App() {
  const { LOGIN, POLLLIST, POLLDETAIL } = clientPath;
  const accessToken = localStorage.getItem("AdminAccessToken");
  const cacheUrl = localStorage.getItem("CACHED_URL");
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to={LOGIN} />}></Route>
            <Route
              path={LOGIN}
              element={accessToken ? <Navigate to={cacheUrl} /> : <Login />}
            >
              {" "}
            </Route>
            <Route
              path={POLLLIST}
              element={
                <ProtectedRoute>
                  <PollList />
                </ProtectedRoute>
              }
            />
            <Route
              path={POLLDETAIL}
              element={
                <ProtectedRoute>
                  <PollDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
