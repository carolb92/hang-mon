import { useContext } from "react";
import GuessContext from "@/context/GuessContext";

export const useGuessContext = () => {
  const context = useContext(GuessContext);

  if (!context) {
    throw new Error("useGuessContext must be used within a GuessProvider");
  }

  return context;
};
