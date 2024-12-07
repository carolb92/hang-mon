import PlayAgainButton from "./Button/PlayAgainButton";

type GameOverContentProps = {
  randomMon: string;
  playAgain: () => void;
};

export default function GameOverContent({
  randomMon,
  playAgain,
}: GameOverContentProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-y-4">
      <span className="text-semibold text-xl">
        No more guesses! The Pokémon was {randomMon}
      </span>
      <span className="w-1/2">
        <PlayAgainButton handleClick={playAgain} />
      </span>
    </div>
  );
}
