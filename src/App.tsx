// import "./index.css";
import Filters from "@/components/Filters/Filters";
import GuessThisMon from "./components/GuessThisMon";
import { useState, useEffect, useRef } from "react";
import Logo from "./components/Logo";
import { GuessContextProvider } from "./context/GuessContext";

export type PokemonObj = {
  name: string;
  url: string;
  // different shape for type endpoint
  pokemon?: {
    name: string;
    url: string;
  };
  // region endpoint
  pokemon_species?: {
    name: string;
    url: string;
  };
};

function App() {
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  // const regionFilter = useRef("all");
  // const typeFilter = useRef("all");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonObj[]>([]);
  const componentMounted = useRef(false);

  // fetch and cache all pokemon
  useEffect(() => {
    async function fetchAndCachePokemon() {
      // check if data is available locally to avoid redundant API calls
      const cachedData = localStorage.getItem("allPokemon");
      if (cachedData) {
        console.log("using cached pokemon data");
        // console.log("cachedData:", cachedData);
        // convert the JSON string back to an object
        console.log("cached pokemon data:", JSON.parse(cachedData));
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
        // TODO: remove weird names from the array (dundunsparce-two-segment, squawkabilly-green-plumage)
      })
      .catch((error) => {
        console.log("Error fetching pokemon data:", error);
        setFilteredPokemon([]); // fallback to an empty array
      });
  }, []);

  // console log the filter when it changes
  useEffect(() => {
    console.log("regionFilter:", regionFilter);
    console.log("typeFilter:", typeFilter);
  }, [regionFilter, typeFilter]);

  // fetch a new types array when the type filter changes
  useEffect(() => {
    if (!componentMounted.current) {
      componentMounted.current = true;
      return;
    }

    async function fetchAndCacheNewType(typeFilter: string) {
      const cachedType = localStorage.getItem(typeFilter);
      if (cachedType) {
        console.log(`using cached ${typeFilter} data`);
        // console.log(`cached ${typeFilter} data:`, cachedType);
        return JSON.parse(cachedType);
      }

      console.log(`fetching ${typeFilter} data from API`);
      const typeUrl = typeFilter.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeUrl}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${typeFilter} type data`);
      }
      const data = await response.json();
      localStorage.setItem(typeFilter, JSON.stringify(data.pokemon));
      return data.pokemon;
    }

    if (typeFilter !== "all") {
      fetchAndCacheNewType(typeFilter)
        .then((data) => {
          setFilteredPokemon(data);
          // console.log(`filteredPokemon: ${JSON.stringify(filteredPokemon)}`);
        })
        .catch((error) => {
          console.log(`Error fetching ${typeFilter} data: ${error}`);
          setFilteredPokemon([]);
        });
    }
  }, [typeFilter]);

  // fetch a new regions array when the region filter changes
  useEffect(() => {
    if (!componentMounted.current) {
      componentMounted.current = true;
      return;
    }

    async function fetchAndCacheNewRegion(regionFilter: string) {
      const cachedRegion = localStorage.getItem(regionFilter);
      if (cachedRegion) {
        console.log(`using cached ${regionFilter} data`);
        // console.log(`cached ${regionFilter} data:`, cachedRegion);
        return JSON.parse(cachedRegion);
      }

      console.log(`fetching ${regionFilter} data from API`);
      const regionUrl = regionFilter.toLowerCase();
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokedex/${regionUrl}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${regionFilter} region data`);
      }
      const data = await response.json();
      localStorage.setItem(regionFilter, JSON.stringify(data.pokemon_entries));
      return data.pokemon_entries;
    }

    if (regionFilter !== "all") {
      fetchAndCacheNewRegion(regionFilter)
        .then((data) => {
          setFilteredPokemon(data);
        })
        .catch((error) => {
          console.log(`Error fetching ${regionFilter} data: ${error}`);
          setFilteredPokemon([]);
        });
    }
  }, [regionFilter]);

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
        <GuessContextProvider>
          <GuessThisMon
            regionFilter={regionFilter}
            typeFilter={typeFilter}
            filteredPokemon={filteredPokemon}
          />
        </GuessContextProvider>
      </div>
    </div>
  );
}

export default App;
