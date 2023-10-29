import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./favorite.css";

/** Função que irá renderizar a página de favoritos do usuário
 * Esta função irá salvar os filmes favoritos do usuário no localStorage do navegador em formato JSON com o nome de @ primeflix
 *
 * */
function Favorite() {
  /*
   * Criando o estado que irá armazenar os filmes favoritos do usuário e inicializando com um array vazio []
   * Como parametro da função useState, passamos o nome do estado que será criado e a função que irá alterar o estado criado
   */
  const [film, setFilm] = useState([]);

  /**
   *  Utilizando o useEffect para renderizar os filmes favoritos do usuário na página de favoritos.
   *  Esta função irá executar toda vez que a página for carregada e irá buscar os filmes favoritos do usuário no localStorage do navegador
   */
  useEffect(() => {
    // Buscando os filmes favoritos do usuário no localStorage do navegador
    const myList = localStorage.getItem("@primeflix");
    // setando os filmes favoritos do usuário no estado criado anteriormente ou retornando um array vazio caso não exista nenhum filme favorito
    setFilm(JSON.parse(myList) || []);
  }, []);

  /**
   * Função que irá excluir um filme da lista de favoritos do usuário quando o usuário clicar no botão excluir
   * Esta função recebe como parametro o id do filme que será excluído da lista de favoritos do usuário
   */
  function excluirFilme(id) {
    //alert("Id clicado " + id);
    /**
     * film.filter((item) -> realiza um filtro no array de filmes favoritos do usuário e retorna todos os filmes menos o que foi clicado.
     * filter() é uma função nativa do javascript que retorna um novo array com todos os elementos que passaram no teste implementado pela função fornecida.
     * */
    let filtroFilmes = film.filter((item) => {
      // Retorna todos os filmes menos o que cliquei
      return item.id !== id;
    });

    // setFilm(filtroFilmes) -> seta o novo array de filmes favoritos do usuário no estado criado anteriormente
    setFilm(filtroFilmes);
    // localStorage.setItem() -> salva o novo array de filmes favoritos do usuário no localStorage do navegador
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    //
    toast.success("FILME REMOVIDO COM SUCESSO.");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {/* Verifica se o array de filmes favoritos do usuário está vazio e renderiza uma mensagem na tela caso esteja vazio*/}
      {film.length === 0 && (
        <span>Você não possui nenhum filme nos favoritos</span>
      )}
      <ul>
        {/* film.map -> percorre o array de filmes favoritos do usuário e renderiza na tela os filmes favoritos do usuário*/}
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
