// Base da URL : https://api.themoviedb.org/3/

/* O que irá mudar são somente as rotas 
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=10' \
      --header 'accept: application/json'


     https://api.themoviedb.org/3/
     


Para consumir as informações da API, nós iremos utilizar a biblioteca do React chamada de Axios. 
Para isso, basta instalar a biblioteca axios no seu projeto
Link para acessar a biblioteca Axios: https://www.npmjs.com/package/axios

*/

// Importar a biblioteca do axios para o arquivo api.js
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
