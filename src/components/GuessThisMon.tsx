import { useEffect, useState, useCallback } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { PokemonObj } from "@/App";
import GameOverContent from "./GameOverContent";
import GamePlayContent from "./GamePlayContent";
import { useGuessContext } from "@/context/useGuessContext";
import pokeball3d from "@/assets/pokeball-3d-removebg.png";

type GuessThisMonProps = {
  regionFilter: string;
  typeFilter: string;
  // regionFilter: { current: string };
  // typeFilter: { current: string };
  filteredPokemon: PokemonObj[];
  children?: React.ReactNode;
};

export default function GuessThisMon({
  regionFilter,
  typeFilter,
  filteredPokemon,
}: GuessThisMonProps) {
  const [randomMon, setRandomMon] = useState<string>("");
  const [randomMonUrl, setRandomMonUrl] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<JSX.Element[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [src, setSrc] = useState(pokeball3d);

  const {
    guessesRemaining,
    setGuessesRemaining,
    setGuessedLetter,
    setGuessedLetters,
  } = useGuessContext();

  const generateRandomMonAndPlaceholder = useCallback(() => {
    //! the shape of filteredPokemon is inconsistent
    console.log(filteredPokemon[0]);
    if (filteredPokemon.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    console.log(filteredPokemon[randomIndex]);
    let selectedMon;
    if (regionFilter === "all" && typeFilter === "all") {
      selectedMon = filteredPokemon[randomIndex].name.toUpperCase();
      setRandomMonUrl(filteredPokemon[randomIndex].url);
    } else if (regionFilter === "all" && typeFilter !== "all") {
      console.log("selectedMon:", filteredPokemon[randomIndex]?.name);
      selectedMon = filteredPokemon[randomIndex]?.name.toUpperCase();
      console.log(filteredPokemon[randomIndex]?.url);
      setRandomMonUrl(filteredPokemon[randomIndex]?.url);
    } else if (regionFilter !== "all" && typeFilter === "all") {
      selectedMon =
        filteredPokemon[randomIndex]?.pokemon_species?.name.toUpperCase();
      setRandomMonUrl(filteredPokemon[randomIndex]!.pokemon_species!.url);
    }
    // console.log(filteredPokemon[randomIndex].url);

    console.log("selectedMon:", selectedMon);

    const placeholderArr: JSX.Element[] = selectedMon!
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

    setRandomMon(selectedMon!);
    setPlaceholder(placeholderArr);
    console.log("selectedMon:", selectedMon);
    // setRandomMonUrl(filteredPokemon[randomIndex].url);
    // console.log("randomMonUrl:", randomMonUrl);
  }, [filteredPokemon, regionFilter, typeFilter]);

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
    // setRandomMonUrl("");
    setSrc(pokeball3d);
  }

  return gameOver ? (
    <GameOverContent randomMon={randomMon} playAgain={handlePlayAgainClick} />
  ) : (
    <GamePlayContent
      randomMon={randomMon}
      placeholder={placeholder}
      setPlaceholder={setPlaceholder}
      playAgain={handlePlayAgainClick}
      randomMonUrl={randomMonUrl}
      src={src}
      setSrc={setSrc}
    />
  );
}
