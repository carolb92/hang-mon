import FilterSelect from "@/components/Filters/FilterSelect";

export default function Filters() {
  const regionsArr = [
    "All",
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea",
  ];
  const typesArr = [
    "All",
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
  ];
  return (
    <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row md:justify-center md:gap-x-4">
      <span className="font-utility text-xl font-semibold text-blue-900">
        Filter by:
      </span>
      <div className="flex w-full flex-row justify-center gap-x-4 md:w-auto">
        <FilterSelect optionsArr={regionsArr} menuTitle="Region" />
        <FilterSelect optionsArr={typesArr} menuTitle="Type" />
      </div>
    </div>
  );
}
