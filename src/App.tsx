// import "./index.css";
import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import Logo from "./components/Logo";
import { GuessContextProvider } from "./context/GuessContext";

function App() {
  return (
    // TODO: different background for mobile?
    <div className="flex h-screen min-w-full flex-col items-center bg-blueSky bg-cover bg-top md:justify-center md:gap-y-20 lg:gap-y-10 lg:bg-center">
      <Logo />
      <div className="flex flex-col">
        <GuessContextProvider>
          <Filters />
          <GuessThisMon />
        </GuessContextProvider>
      </div>
    </div>
  );
}

export default App;
