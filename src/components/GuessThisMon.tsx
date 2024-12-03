import { useEffect, useState, useCallback, useRef } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type GuessThisMonProps = {
  regionFilter: string;
  typeFilter: string;
  setSrc: (value: string) => void;
  filteredPokemon: string[];
};

export default function GuessThisMon({
  regionFilter,
  typeFilter,
  setSrc,
  filteredPokemon,
}: GuessThisMonProps) {
  const [randomMon, setRandomMon] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<JSX.Element[]>([]);
  const [guessedLetter, setGuessedLetter] = useState<string>("");
  const [guessesRemaining, setGuessesRemaining] = useState<number>(7);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const correctGuessesArray = useRef<string[]>([]);

  const generateRandomMonAndPlaceholder = useCallback(() => {
    if (filteredPokemon.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    const selectedMon = filteredPokemon[randomIndex].toUpperCase();

    const placeholderArr: JSX.Element[] = selectedMon
      .split("")
      .map((char, index) => {
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        } else if (char === "-") {
          return <span key={index}>-</span>;
        } else {
          return <CatchingPokemonIcon key={index} />;
        }
      });

    setRandomMon(selectedMon);
    setPlaceholder(placeholderArr);
    console.log("selectedMon:", selectedMon);
  }, [filteredPokemon]);

  useEffect(() => {
    console.log("regionFilter:", regionFilter);
    console.log("typeFilter:", typeFilter);
    generateRandomMonAndPlaceholder();
  }, [
    regionFilter,
    typeFilter,
    filteredPokemon,
    generateRandomMonAndPlaceholder,
  ]);

  function checkGuess() {
    if (randomMon.includes(guessedLetter)) {
      randomMon.split("").map((char, index) => {
        if (char === guessedLetter) {
          correctGuessesArray.current[index] = guessedLetter;
          console.log(correctGuessesArray.current.join(""));
          // check if the user has guessed all letters correctly
          // TODO: display a sprite of the pokemon with setsrc
          if (correctGuessesArray.current.join("") === randomMon) {
            setGameWon(true);
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
      if (guessesRemaining === 0) {
        setGuessesRemaining(7);
        setGuessedLetters([]);
        generateRandomMonAndPlaceholder();
        setGuessedLetter("");
        return;
      }
      setGuessesRemaining((prevGuesses) => prevGuesses - 1);
      setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
    }
    setGuessedLetter("");
  }

  return gameWon ? (
    <span>You win!</span>
  ) : (
    <div className="flex w-full justify-center gap-x-24">
      <span>{randomMon}</span>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <span>{placeholder}</span>
        <span className="text-semibold text-lg">Guess a letter:</span>
        <Input
          type="text"
          value={guessedLetter}
          onChange={(e) => setGuessedLetter(e.target.value.toUpperCase())}
          className="w-12"
        />
        <Button
          onClick={checkGuess}
          className="text-bold mb-14 bg-yellow-100 py-5 text-lg uppercase text-blue-950"
          disabled={
            guessesRemaining === 0 ||
            guessedLetters.includes(guessedLetter) ||
            !/[a-zA-Z]/.test(guessedLetter) ||
            gameWon
          }
        >
          Guess
        </Button>
      </div>
      <div className="flex flex-col gap-y-4">
        <span>Guesses remaining: {guessesRemaining}</span>
        <span className="flex gap-x-2">
          {guessedLetters.map((letter) => {
            return <span key={letter}>{letter}</span>;
          })}
        </span>
      </div>
    </div>
  );
}
// );
// }
