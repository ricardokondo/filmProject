// Importando o React e o componente de rotas do react-router-dom para o arquivo de rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando as páginas que serão utilizadas nas rotas do arquivo de rotas
import Home from "./pages/Home";
import Film from "./pages/Film";
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Favorite from "./pages/Favorite";

// Função que irá exportar as rotas da aplicação para serem utilizadas no arquivo App.js
function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
