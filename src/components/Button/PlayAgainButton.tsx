import StyledButton from "./StyledButton";

type PlayAgainButtonProps = {
  handleClick: () => void;
};

export default function PlayAgainButton({ handleClick }: PlayAgainButtonProps) {
  return <StyledButton btnText="Play Again" handleClick={handleClick} />;
}
