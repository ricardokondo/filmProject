import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import "./filme.css";

function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilm() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "f6a8672f5d18fe891e31254590f7f36e",
            language: "pt-BR",
          },
        })
        .then((response) => {
          //console.log(response);
          setFilm(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
        });
    }

    loadFilm();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes..</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{film.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
        alt={film.title}
      />

      <h3>Sinopse</h3>
      <span>{film.overview}</span>
      <strong>Avaliação: {film.vote_average} / 10</strong>
      {/*
      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
      */}
    </div>
  );
}

export default Film;
