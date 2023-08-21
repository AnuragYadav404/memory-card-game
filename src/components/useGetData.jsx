// return an array of pokemon's data.

import { useEffect, useState } from "react";

const CACHE_KEY = "poke_data";

const pokemonIds = [1, 4, 7, 25, 39, 150, 54, 50, 81, 95, 38, 152];

export default function useGetData() {
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      const cacheData = localStorage.getItem(CACHE_KEY);

      if (cacheData === null) {
        console.log("fetching from api");

        let url = "https://pokeapi.co/api/v2/pokemon/";

        const data = await Promise.all(
          pokemonIds.map((pid) => fetch(url + pid + "/"))
        )
          .then((resp) => Promise.all(resp.map((res) => res.json())))
          .then((ans) =>
            ans.map((ele) => {
              return {
                name: ele.species.name,
                url: ele.sprites.other.dream_world.front_default,
              };
            })
          );

        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setPokeData(data);
      } else {
        console.log("fetching from cache");
        console.log("cache data is ", JSON.parse(cacheData));
        setPokeData(JSON.parse(cacheData));
      }
    };

    fetchData();
  }, []);

  return pokeData;
}
