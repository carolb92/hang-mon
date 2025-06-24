import { useEffect, useState } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import GamePlayContent from "./GamePlayContent";
import GameOverContent from "./GameOverContent";
import { useGuessContext } from "@/context/useGuessContext";
import pokeball3d from "@/assets/pokeball-3d-removebg.png";
import { generateRandomPokemon } from "@/lib/api/pokemon-api";
import { RegionString, TypeString } from "@/lib/api/types";
import { useFilteredPokemon } from "@/hooks/useFilteredPokemon";

export default function GuessThisMon() {
  const [randomMon, setRandomMon] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<JSX.Element[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [src, setSrc] = useState(pokeball3d);

  function generatePlaceholder(pokemonName: string) {
    return pokemonName.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index}>&nbsp;</span>;
      } else if (char === "-") {
        return <span key={index}>-</span>;
      } else {
        return <CatchingPokemonIcon key={index} />;
      }
    });
  }

  const {
    guessesRemaining,
    setGuessesRemaining,
    setGuessedLetter,
    setGuessedLetters,
    region,
    type,
  } = useGuessContext();

  // runs whenever the region or type filter changes
  const { filteredPokemon, error } = useFilteredPokemon(
    region as RegionString,
    type as TypeString,
  );

  // runs whenever the filteredPokemon changes
  useEffect(() => {
    const randomPokemon = generateRandomPokemon(filteredPokemon);
    if (randomPokemon) {
      console.log("randomMon:", randomPokemon);
      setRandomMon(randomPokemon);
      setPlaceholder(generatePlaceholder(randomPokemon));
    } else console.error("error generating random Pokémon");
    if (error) {
      console.error("Error fetching filtered Pokémon:", error);
    }
  }, [filteredPokemon, error, setRandomMon]);

  useEffect(() => {
    console.log("guessesRemaining:", guessesRemaining);
    if (guessesRemaining === 0) {
      setGameOver(true);
      console.log("gameOver:", gameOver);
    }
  }, [guessesRemaining, gameOver]);

  function handlePlayAgainClick() {
    setGuessedLetters([]);
    setGuessedLetter("");
    setGuessesRemaining(7);
    setGameOver(false);
    setSrc(pokeball3d);
    const randomPokemon = generateRandomPokemon(filteredPokemon);
    if (randomPokemon) {
      console.log("randomMon:", randomPokemon);
      setRandomMon(randomPokemon);
      setPlaceholder(generatePlaceholder(randomPokemon));
    } else console.error("error generating random Pokémon");
  }

  return gameOver ? (
    <GameOverContent randomMon={randomMon} playAgain={handlePlayAgainClick} />
  ) : (
    <GamePlayContent
      randomMon={randomMon}
      placeholder={placeholder}
      setPlaceholder={setPlaceholder}
      playAgain={handlePlayAgainClick}
      src={src}
      setSrc={setSrc}
    />
  );
}
