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
    <div className="mt-8 flex flex-col items-center gap-y-3">
      <span className="font-utility text-xl font-semibold text-blue-900">
        No more guesses! The Pokémon was{" "}
        <span className="capitalize">{randomMon}.</span>
      </span>
      <div className="relative h-0 w-full pb-[74%]">
        <iframe
          src="https://giphy.com/embed/12BQY6Nj4ZDAFG"
          width="100%"
          height="100%"
          className="absolute"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <span>
        <PlayAgainButton handleClick={playAgain} />
      </span>
    </div>
  );
}
