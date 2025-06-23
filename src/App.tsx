// import "./index.css";
import Filters from "@/components/Filters/Filters";
// import GuessThisMon from "./components/GuessThisMon";
import { useState, useEffect } from "react"; //, useRef
import Logo from "./components/Logo";
// import { GuessContextProvider } from "./context/GuessContext";
import { getAllPokemon } from "./lib/api/pokemon-api";

function App() {
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  // const [filteredPokemon, setFilteredPokemon] = useState<PokemonObj[]>([]);
  // const componentMounted = useRef(false);
  const [guessOptionsArr, setGuessOptionsArr] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const allPokemon = await getAllPokemon();
      setGuessOptionsArr(allPokemon);
    }

    fetchData();
  }, []);

  return (
    // TODO: different background for mobile?
    <div className="flex h-screen min-w-full flex-col items-center bg-blueSky bg-cover bg-top md:justify-center md:gap-y-20 lg:gap-y-10 lg:bg-center">
      <Logo />
      <div className="flex flex-col">
        <Filters
          setRegionFilter={setRegionFilter}
          setTypeFilter={setTypeFilter}
          // regionFilter={regionFilter}
          // typeFilter={typeFilter}
        />
        {/* <GuessContextProvider>
          <GuessThisMon
            regionFilter={regionFilter}
            typeFilter={typeFilter}
            filteredPokemon={filteredPokemon}
          />
        </GuessContextProvider> */}
      </div>
    </div>
  );
}

export default App;
