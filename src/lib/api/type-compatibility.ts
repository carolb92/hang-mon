import { RegionString, TypeString } from "./types";

// Type introduction by generation
export const TYPE_GENERATION_MAP = {
  normal: 1,
  fighting: 1,
  flying: 1,
  poison: 1,
  ground: 1,
  rock: 1,
  bug: 1,
  ghost: 1,
  fire: 1,
  water: 1,
  grass: 1,
  electric: 1,
  psychic: 1,
  ice: 1,
  dragon: 1,
  dark: 2, // Introduced in Generation 2 (Johto)
  steel: 2, // Introduced in Generation 2 (Johto)
  fairy: 6, // Introduced in Generation 6 (Kalos)
} as const;

// Region to generation mapping
export const REGION_GENERATION_MAP = {
  kanto: 1,
  johto: 2,
  hoenn: 3,
  sinnoh: 4,
  unova: 5,
  kalos: 6,
  alola: 7,
  galar: 8,
  paldea: 9,
} as const;

/**
 * Check if a type is available in a specific region
 */
export function isTypeAvailableInRegion(
  type: TypeString,
  region: RegionString,
): boolean {
  if (type === "all" || region === "all") return true;

  const typeGeneration =
    TYPE_GENERATION_MAP[type as keyof typeof TYPE_GENERATION_MAP];
  const regionGeneration =
    REGION_GENERATION_MAP[region as keyof typeof REGION_GENERATION_MAP];

  if (!typeGeneration || !regionGeneration) return true; // fallback for unknown types/regions

  return typeGeneration <= regionGeneration;
}

/**
 * Get all types available in a specific region
 */
export function getAvailableTypesForRegion(region: RegionString): TypeString[] {
  if (region === "all") {
    return Object.keys(TYPE_GENERATION_MAP) as TypeString[];
  }

  const regionGeneration =
    REGION_GENERATION_MAP[region as keyof typeof REGION_GENERATION_MAP];
  if (!regionGeneration)
    return Object.keys(TYPE_GENERATION_MAP) as TypeString[];

  return Object.entries(TYPE_GENERATION_MAP)
    .filter(([_, typeGeneration]) => typeGeneration <= regionGeneration)
    .map(([type, _]) => type as TypeString);
}

/**
 * Get all regions where a specific type is available
 */
export function getAvailableRegionsForType(type: TypeString): RegionString[] {
  if (type === "all") {
    return Object.keys(REGION_GENERATION_MAP) as RegionString[];
  }

  const typeGeneration =
    TYPE_GENERATION_MAP[type as keyof typeof TYPE_GENERATION_MAP];
  if (!typeGeneration)
    return Object.keys(REGION_GENERATION_MAP) as RegionString[];

  return Object.entries(REGION_GENERATION_MAP)
    .filter(([_, regionGeneration]) => regionGeneration >= typeGeneration)
    .map(([region, _]) => region as RegionString);
}
