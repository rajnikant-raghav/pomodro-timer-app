import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginWithGoogle from "./conponents/LoginWithGoogle";
import Timer from "./conponents/Timer";

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginWithGoogle />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
