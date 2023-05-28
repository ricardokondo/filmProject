import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";

function Film() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilm();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigate, id]);

  function saveFilm() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === film.id
    );

    if (hasFilme) {
      alert("ESSE FILME JÁ ESTA NA LISTA");
      return;
    }

    filmesSalvos.push(film);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("FILME SALVO COM SUCESSO");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

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

      <div className="area-buttons">
        <button onClick={saveFilm}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://www.youtube.com/results?search_query=${film.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Film;
