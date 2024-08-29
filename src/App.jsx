import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Userlist from "./pages/Userlist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/user/list" element={<Userlist />} />
      </Routes>
    </Router>
  );
};

export default App;
