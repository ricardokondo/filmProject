import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";
// URL da API:  /movie/now_playing?api_key=f6a8672f5d18fe891e31254590f7f36e&language=pt-BR

function Home() {
  const [film, setFilm] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilm() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "f6a8672f5d18fe891e31254590f7f36e",
          language: "pt-BR",
          page: 1,
        },
      });

      //console.log(response);
      //console.log(response.data.results.slice(0, 10));
      setFilm(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilm();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filmes </h2>
      </div>
    );
  }
  return (
    <div className="conteiner">
      <div className="lista-filmes">
        {film.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/film/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
