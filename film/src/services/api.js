// Base da URL : https://api.themoviedb.org/3/

/* O que irá mudar são somente as rotas 
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=10' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmE4NjcyZjVkMThmZTg5MWUzMTI1NDU5MGY3ZjM2ZSIsInN1YiI6IjY0NmZjM2Y5NzI2ZmIxMDEyMzBhYzJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uKvPSaK5uYfTJSQT-6KVUFwlBpCqbVO44ZmlJ4IXrR0' \
     --header 'accept: application/json'


     https://api.themoviedb.org/3/
     
URL da API: movie/now_playing?api_key=f6a8672f5d18fe891e31254590f7f36e&language=pt-BR


Para consumir as informações da API, nós iremos utilizar a biblioteca do React chamada de Axios. 
Para isso, basta instalar a biblioteca axios no seu projeto

*/

// Importar a biblioteca
import axios from "axios";

/*  Criamos a variável chamada api e atribuímos a ela, que será o início e a estrutura base do serviço de API 
que consumiremos.
Dentro da criação do Axios, temos uma propriedade chamada. 
Ela recebe o endpoint de sua aplicação, ou seja, a URL da API que será acessada.
*/
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
