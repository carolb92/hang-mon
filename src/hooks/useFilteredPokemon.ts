import { useEffect, useState } from "react";
import {
  getPokemonByRegion,
  getPokemonByType,
  getAllPokemon,
  findRegionAndTypeIntersection,
} from "@/lib/api/pokemon-api";
import { RegionString, TypeString } from "@/lib/api/types";

export function useFilteredPokemon(region: RegionString, type: TypeString) {
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null); // Reset error state before fetching
        if (region !== "all" && type === "all") {
          const data = await getPokemonByRegion(region);
          setFilteredPokemon(data!);
        } else if (region === "all" && type !== "all") {
          const data = await getPokemonByType(type);
          setFilteredPokemon(data!);
        } else if (region === "all" && type === "all") {
          const data = await getAllPokemon();
          setFilteredPokemon(data!);
        } else {
          // there is both a type and region filter. fetch the data and find the intersection
          const data = await findRegionAndTypeIntersection(region, type);
          if (data.length > 0) {
            setFilteredPokemon(data);
          } else {
            console.log(
              `No Pokémon of type ${type} found for the ${region} region.`,
            );
            setFilteredPokemon([]);
          }
        }
      } catch (error) {
        setError(error as string);
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [region, type]);

  return { filteredPokemon, error };
}
