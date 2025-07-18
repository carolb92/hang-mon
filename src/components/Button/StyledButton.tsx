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
      className="group mb-2 bg-yellow-300 py-4 hover:bg-blue-700 md:mb-4 md:py-5"
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      <span className="font-display translate-y-[20%] text-lg uppercase text-blue-800 group-hover:text-yellow-300 group-hover:underline">
        {btnText}
      </span>
    </Button>
  );
}
