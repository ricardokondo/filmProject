// Importando as dependencias e componentes para o arquivo de filme que será o arquivo que irá renderizar as informações do filme
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";
// URL da API:  /movie/now_playing?api_key=SUA_API_KEY&language=pt-BR

// Função que irá renderizar a página de filmes em cartaz no cinema no momento
function Home() {
  // Criando o estado que irá armazenar as informações dos filmes e inicializando com um array vazio []
  const [film, setFilm] = useState([]);
  // Criando o estado que irá armazenar o status de carregamento da página e inicializando com true
  const [loading, setLoading] = useState(true);

  // useEffect -> função que irá executar toda vez que a página for carregada e irá buscar as informações dos filmes na api do themoviedb
  useEffect(() => {
    // metodo async é utilizado para que a função loadFilm() seja executada de forma assincrona e não bloqueie a execução das demais funções
    async function loadFilm() {
      // await api.get() -> aguarda a api do themoviedb retornar as informações dos filmes para que a função continue a ser executada
      // Removi aqui a api_key
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "TO DO",
          language: "pt-BR",
          page: 1,
        },
      });

      //console.log(response);
      //console.log(response.data.results.slice(0, 10));
      // response.data.results -> variável que irá armazenar as informações dos filmes que foram retornadas pela api do themoviedb
      // .slice(0, 10) -> retorna os 10 primeiros filmes do array de filmes retornados pela api do themoviedb
      setFilm(response.data.results.slice(0, 10));
      // setLoading(false) -> seta o status de carregamento da página para false
      setLoading(false);
    }

    // instancia da função loadFilm()
    loadFilm();
  }, []);

  // Verifica se a página está carregando e renderiza uma mensagem na tela caso esteja carregando
  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filmes... </h2>
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
