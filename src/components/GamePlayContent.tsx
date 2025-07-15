import PokeImage from "./PokeImage";
import PlayAgainButton from "./Button/PlayAgainButton";
import React, { useRef, useCallback } from "react";
import { useGuessContext } from "@/context/useGuessContext";
import { getPokemonSprite } from "@/lib/api/pokemon-api";
import GuessInputForm from "./GuessInputForm";

type GamePlayContentProps = {
  randomMon: string;
  placeholder: JSX.Element[];
  setPlaceholder: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  playAgain: () => void;
  src: string;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
};

export default function GamePlayContent({
  randomMon,
  placeholder,
  setPlaceholder,
  playAgain,
  src,
  setSrc,
}: GamePlayContentProps) {
  const correctGuessesArray = useRef<string[]>([]);

  const {
    guessesRemaining,
    setGuessesRemaining,
    setGuessedLetters,
    setGameOver,
    gameWon,
    setGameWon,
  } = useGuessContext();

  function handleCorrectGuess(letter: string) {
    // update placeholder for all matching positions
    const newCorrectGuesses = [...correctGuessesArray.current];

    randomMon.split("").forEach((char, index) => {
      if (char === letter) {
        newCorrectGuesses[index] = letter;

        // update placeholder UI
        setPlaceholder((prev) => {
          const updatedPlaceholder = [...prev];
          updatedPlaceholder[index] = (
            <span key={index}>{letter.toUpperCase()}</span>
          );
          return updatedPlaceholder;
        });
      }
    });

    correctGuessesArray.current = newCorrectGuesses;

    // check win condition
    if (newCorrectGuesses.join("") === randomMon.replace(/-/g, "")) {
      handleGameWon();
    }
  }

  function handleIncorrectGuess(letter: string) {
    setGuessedLetters((prev) => [...prev, letter]);
    if (guessesRemaining === 1) setGameOver(true);
    else setGuessesRemaining((prev) => prev - 1);
  }

  function processGuess(letter: string) {
    if (randomMon.includes(letter)) handleCorrectGuess(letter);
    else handleIncorrectGuess(letter);
  }

  async function fetchSprite(pokemon: string) {
    try {
      const spriteUrl = await getPokemonSprite(pokemon);
      if (spriteUrl) return spriteUrl;
    } catch (error) {
      console.error("Error fetching sprite:", error);
    }
  }

  const handleGameWon = useCallback(async () => {
    const spriteUrl = await fetchSprite(randomMon);
    setSrc(spriteUrl!);
    setGameWon(true);
    correctGuessesArray.current = [];
  }, [randomMon, setSrc, setGameWon]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-x-24">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="mt-6 flex flex-col gap-y-4">
          {!gameWon ? (
            <GuessInputForm
              onGuess={processGuess}
              correctGuessesArray={correctGuessesArray}
              placeholder={placeholder}
            >
              <PokeImage src={src} />
            </GuessInputForm>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-display rounded-lg border-2 border-blue-900 bg-yellow-400 px-2 py-1 text-2xl text-blue-700">
                <p className="translate-y-[20%]">
                  Nice! You caught{" "}
                  <span className="capitalize">{randomMon}</span>!
                </p>
              </span>
              <PokeImage src={src} />
              <PlayAgainButton handleClick={playAgain} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
