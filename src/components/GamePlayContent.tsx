import PokeImage from "./PokeImage";
import { Input } from "@/components/ui/input";
import StyledButton from "./Button/StyledButton";
import PlayAgainButton from "./Button/PlayAgainButton";
import { useRef, useState } from "react";
import pokeball3d from "@/assets/pokeball-3d-removebg.png";

type GamePlayContentProps = {
  randomMon: string;
  setGuessesRemaining: React.Dispatch<React.SetStateAction<number>>;
  placeholder: JSX.Element[];
  setPlaceholder: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  guessesRemaining: number;
  guessedLetter: string;
  setGuessedLetter: React.Dispatch<React.SetStateAction<string>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  playAgain: () => void;
};

export default function GamePlayContent({
  randomMon,
  setGuessesRemaining,
  placeholder,
  setPlaceholder,
  guessesRemaining,
  guessedLetter,
  setGuessedLetter,
  guessedLetters,
  setGuessedLetters,
  playAgain,
}: GamePlayContentProps) {
  const [src, setSrc] = useState(pokeball3d);
  const correctGuessesArray = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);

  function checkGuess() {
    // focus the input after the guess button is clicked
    inputRef.current?.focus();
    if (randomMon.includes(guessedLetter)) {
      randomMon.split("").map((char, index) => {
        if (char === guessedLetter) {
          correctGuessesArray.current[index] = guessedLetter;
          console.log(correctGuessesArray.current.join(""));
          // check if the user has guessed all letters correctly
          // TODO: display a sprite of the pokemon with setsrc
          if (
            correctGuessesArray.current.join("") === randomMon.replace(/-/g, "")
          ) {
            setGameWon(true);
            correctGuessesArray.current = [];
          }
          setPlaceholder((prevPlaceholder) => {
            const updatedPlaceholder = [...prevPlaceholder];
            updatedPlaceholder[index] = (
              <span key={index}>{guessedLetter}</span>
            );
            return updatedPlaceholder;
          });
        }
      });
    } else {
      setGuessesRemaining((prevGuesses) => prevGuesses - 1);
      setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
    }
    setGuessedLetter("");
  }

  const buttonDisabled =
    guessesRemaining === 0 ||
    guessedLetters.includes(guessedLetter) ||
    !/[a-zA-Z]/.test(guessedLetter) ||
    gameWon ||
    guessedLetter.length > 1 ||
    correctGuessesArray.current.includes(guessedLetter);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-x-24">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="mt-6 flex flex-col gap-y-4">
          <div className="flex flex-col items-center">
            {/* // TODO: change this to an HP bar which decreases with each wrong guess */}
            {!gameWon && <span>Guesses remaining: {guessesRemaining}</span>}
            <span className="flex gap-x-2">
              {guessedLetters.map((letter) => {
                return (
                  <span key={letter} className="text-red-600">
                    {letter}
                  </span>
                );
              })}
            </span>
            {/* <span>{children}</span> */}
            {/* // TODO: if gameWon setSrc to pokemon sprite */}
            {gameWon && <span>Congratulations! You caught {randomMon}!</span>}
            <PokeImage src={src} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <span>{placeholder}</span>
          <span className="text-semibold text-xl">Guess a letter:</span>
          <form action="" className="flex flex-col items-center gap-y-4">
            <Input
              type="text"
              value={guessedLetter}
              onChange={(e) => setGuessedLetter(e.target.value.toUpperCase())}
              className="w-12 border-2 border-blue-900"
              ref={inputRef}
            />
            {gameWon ? (
              <PlayAgainButton
                handleClick={playAgain}
                setGameWon={setGameWon}
              />
            ) : (
              <StyledButton
                btnText="Guess"
                handleClick={checkGuess}
                disabled={buttonDisabled}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
