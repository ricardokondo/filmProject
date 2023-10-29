// Importando as dependencias e componentes para o arquivo de cabeçalho da aplicação que será o arquivo que irá renderizar o cabeçalho da aplicação
import { Link } from "react-router-dom";
import "./header.css";

// Função que irá renderizar o cabeçalho da aplicação com o logo e o link para a página de favoritos do usuário
function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Prime Flix
      </Link>
      <Link to={"/favorite"} className="favoritos">
        Meus Filmes
      </Link>
    </header>
  );
}

export default Header;
