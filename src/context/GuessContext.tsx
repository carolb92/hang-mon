import React, { useState, createContext } from "react";

type GuessContextType = {
  randomMon: string;
  setRandomMon: React.Dispatch<React.SetStateAction<string>>;
  placeholder: JSX.Element[];
  setPlaceholder: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  guessedLetter: string;
  setGuessedLetter: React.Dispatch<React.SetStateAction<string>>;
  guessesRemaining: number;
  setGuessesRemaining: React.Dispatch<React.SetStateAction<number>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
};

const GuessContext = createContext<GuessContextType | null>(null);

export function GuessContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [randomMon, setRandomMon] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<JSX.Element[]>([]);
  const [guessedLetter, setGuessedLetter] = useState<string>("");
  const [guessesRemaining, setGuessesRemaining] = useState<number>(7);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const value = {
    randomMon,
    setRandomMon,
    placeholder,
    setPlaceholder,
    guessedLetter,
    setGuessedLetter,
    guessesRemaining,
    setGuessesRemaining,
    guessedLetters,
    setGuessedLetters,
  };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
}

export default GuessContext;
