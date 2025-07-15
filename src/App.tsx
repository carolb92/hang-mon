import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import Logo from "./components/Logo";
import { GuessContextProvider } from "./context/GuessContext";

function App() {
  return (
    <div className="flex h-screen max-h-full min-w-full flex-col items-center justify-evenly bg-blueSky bg-cover bg-top max-sm:bg-[#57b7f3] max-sm:bg-none md:justify-center md:gap-y-20 lg:gap-y-20 lg:bg-center xl:gap-y-2">
      <Logo />
      <div className="flex flex-col lg:justify-evenly">
        <GuessContextProvider>
          <Filters />
          <GuessThisMon />
        </GuessContextProvider>
      </div>
    </div>
  );
}

export default App;
