// import "./index.css";
import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import Logo from "./components/Logo";
import { GuessContextProvider } from "./context/GuessContext";

function App() {
  return (
    // TODO: different background for mobile?
    <div className="flex h-screen max-h-full min-w-full flex-col items-center justify-evenly bg-blueSky bg-cover bg-top md:justify-center md:gap-y-20 lg:gap-y-2 lg:bg-center">
      {/*  lg:justify-evenly */}
      <Logo />
      <div className="flex flex-col lg:justify-evenly">
        {/* lg:h-[50%] xl:h-auto */}
        <GuessContextProvider>
          <Filters />
          <GuessThisMon />
        </GuessContextProvider>
      </div>
    </div>
  );
}

export default App;
