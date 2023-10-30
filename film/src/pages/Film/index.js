// Importando as dependencias e componentes para o arquivo de filme que será o arquivo que irá renderizar as informações do filme
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./filme.css";

// Função que irá renderizar a página de detalhes do filme
function Film() {
  /**
   * const { id } = useParams() -> recupera o id do filme que foi passado na url da página de detalhes do filme
   * Link para documentação do useParams: https://reactrouter.com/web/api/Hooks/useparams
   * */
  const { id } = useParams();

  // const navigate = useNavigate() -> função que irá redirecionar o usuário para a página inicial caso o filme não seja encontrado
  const navigate = useNavigate();
  // Criando o estado que irá armazenar as informações do filme e inicializando com um objeto vazio {}
  const [film, setFilm] = useState({});
  // Criando o estado que irá armazenar o status de carregamento da página e inicializando com true
  const [loading, setLoading] = useState(true);

  /* Utilizando o useEffect para renderizar as informações do filme na página de detalhes do filme.
   *  O useEffect irá executar toda vez que a página for carregada e irá buscar as informações do filme na api do themoviedb
   */
  useEffect(() => {
    // metodo async é utilizado para que a função loadFilm() seja executada de forma assincrona e não bloqueie a execução das demais funções
    async function loadFilm() {
      // await api.get() -> aguarda a api do themoviedb retornar as informações do filme para que a função continue a ser executada
      await api
        /* .get -> realiza uma requisição do tipo get para a api do themoviedb e retorna as informações do filme
         *  pelo id do filme que foi passado na url da página de detalhes do filme
         *  Removi aqui as api_key
         */
        .get(`/movie/${id}`, {
          params: {
            api_key: "f6a8672f5d18fe891e31254590f7f36e",
            language: "pt-BR",
          },
        })
        //.then -> executa uma função quando a requisição for concluída com sucesso
        // response -> variável que irá armazenar as informações do filme que foram retornadas pela api do themoviedb
        .then((response) => {
          //console.log(response);
          // setFilm(response.data) -> seta as informações do filme no estado criado anteriormente
          setFilm(response.data);
          // setLoading(false) -> seta o status de carregamento da página para false
          setLoading(false);
        })
        // .catch -> executa uma função quando a requisição falhar
        // Se a requisição falhar, o usuário será redirecionado para a página inicial
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    // instancia da função loadFilm()
    loadFilm();

    // return -> função que será executada quando o componente for desmontado
    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigate, id]);

  // Função que irá salvar o filme na lista de filmes favoritos do usuário
  function saveFilm() {
    // localStorage.getItem() -> busca os filmes favoritos do usuário no localStorage do navegador
    const minhaLista = localStorage.getItem("@primeflix");
    // JSON.parse() -> converte os filmes favoritos do usuário que estão em formato JSON para um array de objetos ou retorna um array vazio caso não exista nenhum filme favorito
    let filmesSalvos = JSON.parse(minhaLista) || [];

    // hasFilme -> variável que irá verificar se o filme que o usuário está tentando salvar já está na lista de filmes favoritos do usuário
    // some() -> função nativa do javascript que verifica se algum elemento do array passa no teste implementado pela função fornecida  e retorna true ou false
    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === film.id
    );

    // Se o filme que o usuário está tentando salvar já estiver na lista de filmes favoritos do usuário, será exibido um alerta na tela
    if (hasFilme) {
      toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    // filmesSalvos.push(film) -> adiciona o filme que o usuário está tentando salvar na lista de filmes favoritos do usuário
    filmesSalvos.push(film);
    // localStorage.setItem() -> salva o novo array de filmes favoritos do usuário no localStorage do navegador
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    // toast.success() -> exibe um alerta na tela informando que o filme foi salvo com sucesso
    toast.success("FILME SALVO COM SUCESSO");
  }

  // Se o status de carregamento da página for true, será exibido uma mensagem na tela informando que a página está carregando
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
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
