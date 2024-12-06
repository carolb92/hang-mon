import StyledButton from "./Button/StyledButton";

type GameOverContentProps = {
  randomMon: string;
  setGuessedLetters: (value: string[]) => void;
  generateRandomMonAndPlaceholder: () => void;
  setGuessedLetter: (value: string) => void;
  setGuessesRemaining: (value: number) => void;
  setGameOver: (value: boolean) => void;
};

export default function GameOverContent({
  randomMon,
  setGuessedLetters,
  generateRandomMonAndPlaceholder,
  setGuessedLetter,
  setGuessesRemaining,
  setGameOver,
}: GameOverContentProps) {
  function handleClick() {
    setGuessedLetters([]);
    generateRandomMonAndPlaceholder();
    setGuessedLetter("");
    setGuessesRemaining(7);
    setGameOver(false);
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-y-4">
      <span className="text-semibold text-xl">
        No more guesses! The Pokemon was {randomMon}
      </span>
      <span className="w-1/2">
        <StyledButton btnText="Play Again" handleClick={handleClick} />
      </span>
    </div>
  );
}
