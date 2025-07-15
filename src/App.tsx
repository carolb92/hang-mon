import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import Logo from "./components/Logo";
import { GuessContextProvider } from "./context/GuessContext";

function App() {
  return (
    <div className="flex h-screen max-h-full min-w-full flex-col items-center justify-center gap-y-10 bg-blueSky bg-cover bg-top max-sm:bg-[#57b7f3] max-sm:bg-none md:justify-center md:gap-y-6 lg:gap-y-8 lg:bg-center xl:gap-y-6">
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
