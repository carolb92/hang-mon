import PokeImage from "./PokeImage";
import { Input } from "@/components/ui/input";
import StyledButton from "./Button/StyledButton";
import PlayAgainButton from "./Button/PlayAgainButton";
import { useRef, useState, useEffect } from "react";
import pokeball3d from "@/assets/pokeball-3d-removebg.png";
import { useGuessContext } from "@/context/useGuessContext";
import { getPokemonSprite } from "@/lib/api/pokemon-api";
// import HPBar from "./HPBar";

type GamePlayContentProps = {
  randomMon: string;
  placeholder: JSX.Element[];
  setPlaceholder: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  playAgain: () => void;
  // randomMonUrl: string;
  src: string;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
};

export default function GamePlayContent({
  randomMon,
  placeholder,
  setPlaceholder,
  playAgain,
  // randomMonUrl,
  src,
  setSrc,
}: GamePlayContentProps) {
  // const [src, setSrc] = useState(pokeball3d);
  const correctGuessesArray = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const {
    guessedLetter,
    setGuessedLetter,
    guessesRemaining,
    setGuessesRemaining,
    guessedLetters,
    setGuessedLetters,
  } = useGuessContext();

  function checkGuess() {
    // focus the input after the guess button is clicked
    inputRef.current?.focus();
    if (randomMon.includes(guessedLetter.toLowerCase())) {
      randomMon.split("").map((char, index) => {
        if (char === guessedLetter.toLowerCase()) {
          correctGuessesArray.current[index] = guessedLetter.toLowerCase();
          console.log(correctGuessesArray.current.join(""));
          // check if the user has guessed all letters correctly
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

  let errorMessage = "";

  if (guessedLetter.length > 0) {
    if (
      guessedLetters.includes(guessedLetter) ||
      correctGuessesArray.current.includes(guessedLetter)
    ) {
      errorMessage = "You already guessed that letter!";
    } else if (!/[a-zA-Z]/.test(guessedLetter)) {
      errorMessage = "Enter an alphabetic character.";
    } else if (guessedLetter.length > 1) {
      errorMessage = "Enter only one letter at a time.";
    } else {
      errorMessage = "";
    }
  }

  // if the game is won, fetch the pokemon sprite
  useEffect(() => {
    if (gameWon) {
      async function fetchSprite() {
        try {
          const spriteUrl = await getPokemonSprite(randomMon);
          if (spriteUrl) {
            setSrc(spriteUrl);
          } else {
            console.error("Error fetching sprite URL");
          }
        } catch (error) {
          console.error("Error fetching sprite:", error);
        }
      }
      fetchSprite();
    }
  }, [gameWon, randomMon, setSrc]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-x-24">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="mt-6 flex flex-col gap-y-4">
          <div className="flex flex-col items-center">
            {/* // TODO: change this to an HP bar which decreases with each wrong guess */}
            {!gameWon && (
              <>
                {/* //TODO: refactor to a separate component? */}
                <span>Guesses remaining: {guessesRemaining}</span>
                {/* <HPBar guessesRemaining={guessesRemaining} /> */}
                <span className="flex gap-x-2">
                  {guessedLetters.map((letter) => {
                    return (
                      <span key={letter} className="text-red-600">
                        {letter}
                      </span>
                    );
                  })}
                </span>
              </>
            )}
            {/* <span>{children}</span> */}
            {gameWon && <span>Congratulations! You caught {randomMon}!</span>}
            <PokeImage src={src} />
          </div>
        </div>
        {/* //TODO: refactor to a separate component? */}
        <div className="flex flex-col items-center gap-y-4">
          <span>{placeholder}</span>
          <span className="text-semibold text-xl">Guess a letter:</span>
          <form action="" className="flex flex-col items-center gap-y-4">
            {/* //TODO: add error messages for invalid input */}
            <Input
              type="text"
              value={guessedLetter}
              onChange={(e) => setGuessedLetter(e.target.value.toUpperCase())}
              className="w-12 border-2 border-blue-900"
              ref={inputRef}
              disabled={gameWon}
            />
            {errorMessage && (
              <span className="text-red-600">{errorMessage}</span>
            )}
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
