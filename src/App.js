import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Signin from "./pages/signin";
import Home from "./pages/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './assets/styles/globalStyles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
