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
    } else {
      // add to selected array
      setSelected([...selected, name]);
      score.current++;
      if(score.current === pokemonData.length) {
        setGameOver(true);
      }
    }
  }

  function handlePlayAgain() {
    setGameOver((val) => !val);
    score.current = 0;
  }



  return (
    <div className="container">
      <h3>Dont select the same card twice</h3>
      <h3>Score: {score.current}</h3>
      <h3>Best Score: {best}</h3>
      {gameOver && (
        <div>
          <h1>GAME OVER!!!</h1>
          {score.current === pokemonData.length ? <h2>You WON!!</h2> : <h2>You Lost {':('}</h2>} 
          <button onClick={handlePlayAgain}>Play Again</button>
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
                <p>{pokemon.name}</p>
                <img src={pokemon.url} alt={pokemon.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
