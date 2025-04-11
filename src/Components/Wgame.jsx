import React, { useState, useEffect } from 'react';


const WORDS = ['react', 'apple', 'grape', 'melon', 'peach'];

const getFeedback = (guess, target) => {
  const result = Array(5).fill('gray');
  const targetLetters = target.split('');

  // Mark greens
  guess.split('').forEach((letter, i) => {
    if (letter === target[i]) {
      result[i] = 'green';
      targetLetters[i] = null;
    }
  });

  // Mark yellows
  guess.split('').forEach((letter, i) => {
    if (result[i] === 'gray' && targetLetters.includes(letter)) {
      result[i] = 'yellow';
      targetLetters[targetLetters.indexOf(letter)] = null;
    }
  });

  return result;
};

function Wgame() {
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
  }, []);

  const handleGuess = () => {
    if (currentGuess.length !== 5) return alert("Enter a 5-letter word!");
    const feedback = getFeedback(currentGuess, targetWord);
    const newGuess = { word: currentGuess, feedback };
    setGuesses([...guesses, newGuess]);
    setCurrentGuess('');

    if (currentGuess === targetWord) {
      setStatus('You guessed it!');
    } else if (guesses.length + 1 >= 6) {
      setStatus(`Out of tries! The word was "${targetWord}"`);
    }
  };

  return (
    <div className="container">
      <h1>Wordle game</h1>
      <div className="guesses">
        {guesses.map((g, i) => (
          <div key={i} className="guess-row">
            {g.word.split('').map((letter, idx) => (
              <div key={idx} className={`letter-box ${g.feedback[idx]}`}>
                {letter.toLowerCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
      {status ? (
        <div className="status">{status}</div>
      ) : (
        <div className="input-area">
          <input
            type="text"
            maxLength={5}
            value={currentGuess}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              if (/^[a-z]*$/.test(value)) {
                setCurrentGuess(value);
              }
            }}
          />
          <button onClick={handleGuess}>Guess</button>
        </div>
      )}
    </div>
  );
}

export default Wgame;
