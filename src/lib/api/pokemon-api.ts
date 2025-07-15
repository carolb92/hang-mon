import { MainClient } from "pokenode-ts";
import { RegionString, TypeString } from "./types";

export const mainApi = new MainClient();
export const pokeApi = mainApi.pokemon;
export const gameApi = mainApi.game;

// pokeapi.co/api/v2/pokedex/{id}
// dex ids: name
// 1: national
// 2: kanto
// 3: original-johto
// 4: hoenn
// 5: original-sinnoh
// 6: extended-sinnoh
// 7: updated-johto
// 8: original-unova
// 9: updated-unova
// 10:
// 11: conquest-gallery
// 12: kalos-central
// 13: kalos-coastal
// 14: kalos-mountain
// 15: updated-hoenn
// 16: original-alola
// 17: original-melemele
// 18: original-akala
// 19: original-ulaula
// 20: original-poni
// 21: updated-alola
// 22: updated-melmele
// 23: updated-akala
// 24: updated-ulaula
// 25: updated-poni
// 26: letsgo-kanto
// 27: galar
// 28: isle-of-armor
// 29: crown-tundra
// 30: hisui
// 31: paldea
// 32: kitakami
// 33: blueberry

export function regionStringToGenerationId(
  regionName: RegionString,
): number | undefined {
  switch (regionName) {
    case "kanto":
      return 1;
    case "johto":
      return 2;
    case "hoenn":
      return 3;
    case "sinnoh":
      return 4;
    case "unova":
      return 5;
    case "kalos":
      return 6;
    case "alola":
      return 7;
    case "galar":
      return 8;
    case "paldea":
      return 9;
    default:
      console.log(`Region ${regionName} not found.`);
  }
}

// returns an array of all pokemon names
export async function getAllPokemon() {
  const allPokemon = await pokeApi.listPokemons(0, 1025); // skip 0 pokemon and return 1025 pokemon (i.e., fetch all pokemon)
  return allPokemon.results.map((pokemon) => pokemon.name);
}

// returns an array of pokemon names from a given region
export async function getPokemonByRegion(regionName: RegionString) {
  const regionId = regionStringToGenerationId(regionName);
  if (typeof regionId !== "number") {
    console.error(`Region ${regionName} not found.`);
    return;
  }
  const res = await gameApi.getGenerationById(regionId);
  return res.pokemon_species.map((species) => species.name);
}

// returns an array of pokemon names of a specified type
export async function getPokemonByType(type: TypeString) {
  const res = await pokeApi.getTypeByName(type);
  return res.pokemon.map((pokemon) => pokemon.pokemon.name);
}

export async function findRegionAndTypeIntersection(
  regionName: RegionString,
  type: TypeString,
) {
  const regionSet = new Set(await getPokemonByRegion(regionName));
  const typeSet = new Set(await getPokemonByType(type));
  return Array.from([...regionSet].filter((pokemon) => typeSet.has(pokemon)));
}

export async function getPokemonSprite(pokemonName: string) {
  const res = await pokeApi.getPokemonByName(pokemonName);
  console.log("sprite res:", res);
  return res.sprites.front_default;
}

export function generateRandomPokemon(
  pokemonArr: string[],
): string | undefined {
  if (pokemonArr.length === 0) return;
  const randomIndex = Math.floor(Math.random() * pokemonArr.length);
  return pokemonArr[randomIndex];
}
