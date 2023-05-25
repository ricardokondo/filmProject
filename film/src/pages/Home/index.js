import { useEffect, useState } from "react";
import api from "../../services/api";

// URL da API:  /movie/now_playing?api_key=f6a8672f5d18fe891e31254590f7f36e&language=pt-BR

function Home() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    async function loadFilm() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "f6a8672f5d18fe891e31254590f7f36e",
          language: "pt-BR",
          page: 1,
        },
      });

      console.log(response);
    }

    loadFilm();
  }, []);

  return (
    <div>
      <h1>Bem vindo a Home</h1>
    </div>
  );
}

export default Home;
