import { useState } from "react";
import "./App.css";
import Firstpage from "./components/firstPage/Firstpage";
import { SecondPage } from "./components/secondPage/SecondPage";
import { Thirdpage } from "./components/secondPage/checkboxpage/Thirdpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/secondpage" element={<SecondPage />} />
        </Routes>
      </BrowserRouter>

      {/* <Firstpage /> */}
      {/* <SecondPage/> */}
      {/* <Thirdpage/> */}
    </div>
  );
}

export default App;
