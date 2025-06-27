import { Button } from "@/components/ui/button";

type StyledButtonProps = {
  btnText: string;
  handleClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};
export default function StyledButton({
  btnText,
  handleClick,
  disabled,
  type = "button",
}: StyledButtonProps) {
  return (
    <Button
      type={type}
      className="text-bold mb-14 bg-yellow-400 py-5 text-lg uppercase text-blue-950 hover:text-yellow-500"
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      {btnText}
    </Button>
  );
}
