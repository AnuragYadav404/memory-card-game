import { useRef, useState } from "react";
import "./App.css";

import useGetData from "./components/useGetData";

function App() {
  let pokemonData = useGetData();
  const [selected, setSelected] = useState([]);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const score = useRef(0);

  if (!gameOver && pokemonData) {
    pokemonData = shuffle(pokemonData);
  }


  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  function handleSelection(e, name) {
    if (selected.includes(name)) {
      // game over
      setGameOver((val) => !val);
      setSelected([]);
      if(score.current > best) {
        setBest(score.current);
      }
      score.current = 0;
    } else {
      // add to selected array
      setSelected([...selected, name]);
      score.current++;
      if(score.current === pokemonData.length) {
        setGameOver(true);
      }
    }
  }

  return (
    <div className="container">
      <h2>Score: {score.current}</h2>
      <h2>Best Score: {best}</h2>
      {gameOver && (
        <div>
          <h1>GAME OVER!!!</h1>
          {score.current === pokemonData.length ? <h2>You WON!!</h2> : <h2>You Lost {':('}</h2>} 
          <button onClick={() => setGameOver((val) => !val)}>Play Again</button>
        </div>
      )}
      {!gameOver && pokemonData && (
        <div className="pokemonCardDisplay">
          {pokemonData.map((pokemon) => {
            return (
              <div
                key={pokemon.name}
                onClick={(e) => handleSelection(e, pokemon.name)}
                className="card"
              >
                <h3>Pokemon: {pokemon.name}</h3>
                <img src={pokemon.url} alt={pokemon.name} />
              </div>
            );
          })}
        </div>
      )}
      <h1>Dont select the same card twice</h1>
    </div>
  );
}

export default App;
