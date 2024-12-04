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
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

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

  useEffect(() => {
    console.log("guessesRemaining:", guessesRemaining);
    if (guessesRemaining === 0) {
      setGuessedLetters([]);
      generateRandomMonAndPlaceholder();
      setGuessedLetter("");
      setGameOver(true);
      console.log("gameOver:", gameOver);
      setGuessesRemaining(7);
    }
  }, [guessesRemaining, gameOver, generateRandomMonAndPlaceholder]);

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
      // if (guessesRemaining === 0) {
      //   setGuessesRemaining(7);
      //   setGuessedLetters([]);
      //   generateRandomMonAndPlaceholder();
      //   setGuessedLetter("");
      //   return;
      // }
      setGuessesRemaining((prevGuesses) => prevGuesses - 1);
      // setGuessesRemaining((prevGuesses) => {
      //   const newGuesses = prevGuesses - 1;
      //   if (newGuesses === 0) {
      //     // TODO: move this logic to the play again button
      //     // setGuessedLetters([]);
      //     // generateRandomMonAndPlaceholder();
      //     // setGuessesRemaining(7);
      //     // setGuessedLetter("");
      //     return 7;
      //   }
      //   return newGuesses;
      // });
      // console.log("guessesRemaining:", guessesRemaining);
      setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
    }
    setGuessedLetter("");
  }

  //TODO: refactor to individual components, use a switch/case statement?
  let content;

  if (gameOver) {
    content = (
      <span>
        No more guesses! The correct answer was {randomMon}. Try again?
      </span>
    );
  } else if (gameWon) {
    content = <span>You win!</span>;
  } else {
    content = (
      <div className="flex w-full flex-col items-center justify-center gap-x-24 md:flex-row md:items-start">
        {/* <span>{randomMon}</span> */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <span>{placeholder}</span>
          <span className="text-semibold text-xl">Guess a letter:</span>
          <form action="" className="flex flex-col items-center gap-y-4">
            <Input
              type="text"
              value={guessedLetter}
              onChange={(e) => setGuessedLetter(e.target.value.toUpperCase())}
              className="w-12"
              ref={inputRef}
            />
            {/* // TODO: disable if the input value has already been guessed correctly */}
            <Button
              onClick={checkGuess}
              className="text-bold mb-14 bg-yellow-100 py-5 text-lg uppercase text-blue-950"
              disabled={
                guessesRemaining === 0 ||
                guessedLetters.includes(guessedLetter) ||
                !/[a-zA-Z]/.test(guessedLetter) ||
                gameWon ||
                guessedLetter.length > 1 ||
                correctGuessesArray.current.includes(guessedLetter)
              }
            >
              Guess
            </Button>
          </form>
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

  // return gameWon ? (
  //   <span>You win!</span>
  // ) : (
  //   <div className="flex w-full flex-col items-center justify-center gap-x-24 md:flex-row md:items-start">
  //     <span>{randomMon}</span>
  //     <div className="flex flex-col items-center justify-center gap-y-4">
  //       <span>{placeholder}</span>
  //       <span className="text-semibold text-xl">Guess a letter:</span>
  //       <form action="" className="flex flex-col items-center gap-y-4">
  //         <Input
  //           type="text"
  //           value={guessedLetter}
  //           onChange={(e) => setGuessedLetter(e.target.value.toUpperCase())}
  //           className="w-12"
  //           ref={inputRef}
  //         />
  //         <Button
  //           onClick={checkGuess}
  //           className="text-bold mb-14 bg-yellow-100 py-5 text-lg uppercase text-blue-950"
  //           disabled={
  //             guessesRemaining === 0 ||
  //             guessedLetters.includes(guessedLetter) ||
  //             !/[a-zA-Z]/.test(guessedLetter) ||
  //             gameWon ||
  //             guessedLetter.length > 1
  //           }
  //         >
  //           Guess
  //         </Button>
  //       </form>
  //     </div>
  //     <div className="flex flex-col gap-y-4">
  //       <span>Guesses remaining: {guessesRemaining}</span>
  //       <span className="flex gap-x-2">
  //         {guessedLetters.map((letter) => {
  //           return <span key={letter}>{letter}</span>;
  //         })}
  //       </span>
  //     </div>
  //   </div>
  // );
  return content;

  // TODO: add a message when the game is over with a play again button
}
