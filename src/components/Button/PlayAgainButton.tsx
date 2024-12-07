import StyledButton from "./StyledButton";

type PlayAgainButtonProps = {
  handleClick: () => void;
  setGameWon?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PlayAgainButton({
  handleClick,
  setGameWon,
}: PlayAgainButtonProps) {
  function resetGame() {
    handleClick();
    if (setGameWon !== undefined) setGameWon(false);
  }
  return <StyledButton btnText="Play Again" handleClick={resetGame} />;
}
