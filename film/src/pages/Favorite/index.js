import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorite.css";

function Favorite() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    setFilm(JSON.parse(myList) || []);
  }, []);

  function excluirFilme(id) {
    //alert("Id clicado " + id);
    let filtroFilmes = film.filter((item) => {
      // Retorna todos os filmes menos o que cliquei
      return item.id != id;
    });
    setFilm(filtroFilmes);

    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {film.length === 0 && (
        <span>Você não possui nenhum filme nos favoritos</span>
      )}
      <ul>
        {film.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/film/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorite;
