import React, { useRef, useState } from "react";
import { useGuessContext } from "@/context/useGuessContext";
import { Input } from "@/components/ui/input";
import StyledButton from "./Button/StyledButton";

type GuessInputFormProps = {
  children: React.ReactNode;
  placeholder: JSX.Element[];
  onGuess: (letter: string) => void;
  correctGuessesArray: React.MutableRefObject<string[]>;
};

export default function GuessInputForm({
  children,
  placeholder,
  correctGuessesArray,
  onGuess,
}: GuessInputFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  const {
    guessesRemaining,
    guessedLetters,
    guessedLetter,
    setGuessedLetter,
    gameWon,
  } = useGuessContext();

  const buttonDisabled =
    guessesRemaining === 0 ||
    guessedLetter.length === 0 ||
    gameWon ||
    !isInputValid;

  function validateInput(letter: string) {
    if (letter.trim().length > 0) {
      // more than one letter entered
      if (letter.trim().length > 1) {
        setInputErrorMsg("Enter only one letter at a time.");
        setIsInputValid(false);
      }
      // letter already guessed
      else if (
        guessedLetters.includes(letter.trim()) ||
        correctGuessesArray.current.includes(letter.trim().toLowerCase())
      ) {
        setInputErrorMsg("You already guessed that letter!");
        setIsInputValid(false);
      }
      // non-alphabetic character entered
      else if (!/[a-zA-Z]/.test(letter.trim())) {
        setInputErrorMsg("Enter an alphabetic character.");
        setIsInputValid(false);
      } else {
        setInputErrorMsg("");
        setIsInputValid(true);
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isInputValid && guessedLetter.trim()) {
      onGuess(guessedLetter.toLowerCase());
      setGuessedLetter(""); // clear input after submission
      inputRef.current?.focus(); // keep focus on input
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <span>Guesses remaining: {guessesRemaining}</span>
        <span className="flex gap-x-2">
          {guessedLetters.map((letter) => {
            return (
              <span key={letter} className="text-red-600">
                {letter.toUpperCase()}
              </span>
            );
          })}
        </span>
        {/* PokeImage component goes here */}
        <span>{children}</span>
      </div>
      <div className="flex flex-col items-center gap-y-4">
        <span>{placeholder}</span>
        <>
          <span className="text-semibold text-xl">Guess a letter:</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4"
          >
            <Input
              type="text"
              value={guessedLetter}
              onChange={(e) => {
                const input = e.target.value.toUpperCase();
                setGuessedLetter(input);
                validateInput(input);
              }}
              className="w-12 border-2 border-blue-900"
              ref={inputRef}
              disabled={gameWon}
            />
            {inputErrorMsg && (
              <span className="text-red-600">{inputErrorMsg}</span>
            )}
            <StyledButton
              btnText="Guess"
              type="submit"
              disabled={buttonDisabled}
            />
          </form>
        </>
      </div>
    </div>
  );
}
