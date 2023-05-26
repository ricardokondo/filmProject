import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Film from "./pages/Film";
import Header from "./components/Header";
import Erro from "./pages/Erro";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
