import "./App.css";
import Firstpage from "./components/firstPage/Firstpage";
import { SecondPage } from "./components/secondPage/SecondPage";

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
    </div>
  );
}

export default App;
