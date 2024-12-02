import { useEffect, useState, useCallback } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

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

  return (
    <div className="flex flex-col">
      <span>{randomMon}</span>
      <span>{placeholder}</span>
    </div>
  );
}
