import "./App.css";
import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import List from "./Components/List";
import Detail from "./Components/Detail";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>

          <Route path="/polllist" element={<List />}></Route>

          <Route path="/detail" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;