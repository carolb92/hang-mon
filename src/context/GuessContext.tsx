import React, { useState, createContext } from "react";
import useURLState from "../hooks/useURLState";
import { RegionString, TypeString } from "@/lib/api/types";

type GuessContextType = {
  guessedLetter: string;
  setGuessedLetter: React.Dispatch<React.SetStateAction<string>>;
  guessesRemaining: number;
  setGuessesRemaining: React.Dispatch<React.SetStateAction<number>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const GuessContext = createContext<GuessContextType | null>(null);

export function GuessContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [guessedLetter, setGuessedLetter] = useState<string>("");
  const [guessesRemaining, setGuessesRemaining] = useState<number>(7);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [region, setRegion] = useURLState("region", "all" as RegionString);
  const [type, setType] = useURLState("type", "all" as TypeString);

  const value = {
    guessedLetter,
    setGuessedLetter,
    guessesRemaining,
    setGuessesRemaining,
    guessedLetters,
    setGuessedLetters,
    region,
    setRegion,
    type,
    setType,
  };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
}

export default GuessContext;
