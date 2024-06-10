import { useState, useEffect } from 'react';
import './estilos.css';

function App() {
  const [tries, setTries] = useState(0)
  const [wordsList, setWordsList] = useState("")
  const [randomWord, setRandomWord] = useState("")
  const [playerState, setplayerState] = useState("")
  const [letter, setLetter] = useState({
    letter1: '',
    letter2: '',
    letter3: '',
    letter4: '',
    letter5: '',
    letter6: '',
    letter7: '',
    letter8: '',
    letter9: '',
    letter10: '',
    letter11: '',
    letter12: '',
    letter13: '',
    letter14: '',
    letter15: '',
    letter16: '',
    letter17: '',
    letter18: '',
    letter19: '',
    letter20: '',
    letter21: '',
    letter22: '',
    letter23: '',
    letter24: '',
    letter25: ''
  });
  const [inputLetter, setInputLetter] = useState({
    letter1: '',
    letter2: '',
    letter3: '',
    letter4: '',
    letter5: '',
  });
  const [word, setWord] = useState('');
  const [currentRow, setCurrentRow] = useState(1);

  useEffect(() => {
    fetch('./src/words.json')
      .then(data => data.json())
      .then(data => setWordsList(data))
  }, [])

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 46);
    setRandomWord(wordsList[randomNumber])
  }, [wordsList])

  const changes = (ev) => {
    const { value } = ev.target;
    setWord(value);
  };

  const send = (ev) => {
    ev.preventDefault();

    const lettersToUpdate = {};
    for (let i = 0; i < word.length; i++) {
      lettersToUpdate[`letter${(currentRow - 1) * 5 + i + 1}`] = word[i];
    }

    setTries(tries + 1)

    if (tries == 4 & playerState != "¡Has ganado!") {

      if (word == randomWord) {

        wirteLetters(lettersToUpdate)
        checkLetters(randomWord, word)
        setplayerState("¡Has ganado!")

      } else {

        wirteLetters(lettersToUpdate)
        setplayerState("Has perdido, la palabra era: " + randomWord)

      }

    } else if (tries <= 4) {

      wirteLetters(lettersToUpdate)
      if (word == randomWord) {
        setplayerState("¡Has ganado!")
      }

    }

    formulario.reset();
  };

  function wirteLetters(lettersToUpdate) {
    setLetter((prevLetter) => ({
      ...prevLetter,
      ...lettersToUpdate
    }));

    if (currentRow < 5) {
      setCurrentRow(currentRow + 1);
    }

    checkLetters(randomWord, word)
  }

  function checkLetters(randomWord, word) {
    const setLetterAtPlace = (place, value) => {
      setInputLetter(prevState => ({
        ...prevState,
        [`letter${place}`]: value
      }));
    };

    var placeC = 0


    console.log(word)
    for (var c of word) {
      var placeA = 0 
      placeC += 1
      for(var a of randomWord) {
        placeA += 1
        if (c == a & placeC == placeA) {  
          setLetterAtPlace(placeA, a)
        }
      }
    }
  }

  function reload() {
    location.reload()
  }

  return (
    <div className='campos'>
      <form id='formulario' onSubmit={send}>
        <input minLength={5} maxLength={5} className='form-control' onChange={changes} />
      </form>

      {[0, 1, 2, 3, 4].map(row => (
        <div key={row} className='filas'>
          {[0, 1, 2, 3, 4].map(col => (
            <div key={col} className='campo'>
              {letter[`letter${row * 5 + col + 1}`]}
            </div>
          ))}
        </div>
      ))}

      <div className='respuesta'>
        <div className='palabra'>{inputLetter["letter1"]}</div>
        <div className='palabra'>{inputLetter["letter2"]}</div>
        <div className='palabra'>{inputLetter["letter3"]}</div>
        <div className='palabra'>{inputLetter["letter4"]}</div>
        <div className='palabra'>{inputLetter["letter5"]}</div>
      </div>

      <p>{playerState}</p>
      <button onClick={reload} className='btn-primary'>Reiniciar</button>
    </div>
  );
}

export default App;