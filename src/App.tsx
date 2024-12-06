// import "./index.css";
import PokeImage from "./components/PokeImage";
import logo from "./assets/hang-mon-logo.png";
import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import pokeball3d from "./assets/pokeball-3d-removebg.png";
import { useState, useEffect } from "react";

export type PokemonObj = {
  name: string;
  url: string;
};

function App() {
  const [src, setSrc] = useState(pokeball3d);
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonObj[]>([]);

  // fetch and cache all pokemon
  useEffect(() => {
    async function fetchAndCachePokemon() {
      // check if data is available locally to avoid redundant API calls
      const cachedData = localStorage.getItem("allPokemon");
      if (cachedData) {
        console.log("using cached pokemon data");
        console.log("cachedData:", cachedData);
        // convert the JSON string back to an object
        return JSON.parse(cachedData);
      }

      console.log("fetching pokemon data from API");
      // wait for the fetch call to complete before proceeding
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pokemon data");
      }

      // parse the response body to a JSON object, wait for the parsing to complete
      // converts the raw JSON response into a usable JavaScript object
      const data = await response.json();
      // convert the data.results object to a string (localStorage only stores strings) and cache it locally
      localStorage.setItem("allPokemon", JSON.stringify(data.results));
      return data.results;
    }

    // const pokeNamesArr: string[] = [];

    // function createNamesArr(pokemonData: PokemonObj[]) {
    //   for (const pokemon of pokemonData) {
    //     pokeNamesArr.push(pokemon.name);
    //   }
    //   return pokeNamesArr;
    // }

    fetchAndCachePokemon()
      .then((data) => {
        setFilteredPokemon(data); // initially set to all pokemon
        // console.log(`pokeNamesArr: ${createNamesArr(data)}`);
        console.log("filteredPokemon:", filteredPokemon);
        // TODO: remove "type-null" and other weird ones from the array
      })
      .catch((error) => {
        console.log("Error fetching pokemon data:", error);
        setFilteredPokemon([]); // fallback to an empty array
      });
  }, []);

  return (
    // TODO: different background for mobile?
    <div className="bg-blueSky flex h-screen min-w-full flex-col items-center bg-cover bg-top md:justify-center md:gap-y-20 lg:gap-y-10 lg:bg-center">
      {/* // TODO: refactor to a logo component  */}
      <div className="mt-8 w-[90%] md:w-[60%] lg:w-[30%]">
        <img src={logo} alt="Hang 'Mon Logo" className="h-auto w-full" />
      </div>
      <div className="flex flex-col">
        <Filters
          setRegionFilter={setRegionFilter}
          setTypeFilter={setTypeFilter}
        />
        <GuessThisMon
          regionFilter={regionFilter}
          typeFilter={typeFilter}
          setSrc={setSrc}
          filteredPokemon={filteredPokemon}
        >
          <PokeImage src={src} />
        </GuessThisMon>
      </div>
    </div>
  );
}

export default App;
