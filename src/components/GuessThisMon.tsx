import { useEffect, useState, useCallback } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { PokemonObj } from "@/App";
import GameOverContent from "./GameOverContent";
import GamePlayContent from "./GamePlayContent";

type GuessThisMonProps = {
  regionFilter: string;
  typeFilter: string;
  filteredPokemon: PokemonObj[];
  children?: React.ReactNode;
};

export default function GuessThisMon({
  regionFilter,
  typeFilter,
  filteredPokemon,
}: GuessThisMonProps) {
  const [randomMon, setRandomMon] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<JSX.Element[]>([]);
  const [guessedLetter, setGuessedLetter] = useState<string>("");
  const [guessesRemaining, setGuessesRemaining] = useState<number>(7);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const generateRandomMonAndPlaceholder = useCallback(() => {
    if (filteredPokemon.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    const selectedMon = filteredPokemon[randomIndex].name.toUpperCase();

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

  useEffect(() => {
    console.log("guessesRemaining:", guessesRemaining);
    if (guessesRemaining === 0) {
      setGameOver(true);
      console.log("gameOver:", gameOver);
    }
  }, [guessesRemaining, gameOver, generateRandomMonAndPlaceholder]);

  function handlePlayAgainClick() {
    setGuessedLetters([]);
    generateRandomMonAndPlaceholder();
    setGuessedLetter("");
    setGuessesRemaining(7);
    setGameOver(false);
  }

  let content;

  if (gameOver) {
    content = (
      <GameOverContent randomMon={randomMon} playAgain={handlePlayAgainClick} />
    );
  } else {
    content = (
      <GamePlayContent
        randomMon={randomMon}
        setGuessesRemaining={setGuessesRemaining}
        placeholder={placeholder}
        setPlaceholder={setPlaceholder}
        guessesRemaining={guessesRemaining}
        guessedLetter={guessedLetter}
        setGuessedLetter={setGuessedLetter}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLetters}
        playAgain={handlePlayAgainClick}
      />
    );
  }

  return content;
}
