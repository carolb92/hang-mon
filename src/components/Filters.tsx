import FilterSelect from "@/components/FilterSelect";

type FiltersProps = {
  setRegionFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function Filters({
  setRegionFilter,
  setTypeFilter,
}: FiltersProps) {
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
    "Stellar",
  ];
  return (
    <div className="flex w-[360px] items-center justify-between">
      <span className="text-xl font-semibold text-blue-950">Filter by:</span>
      <FilterSelect
        optionsArr={regionsArr}
        menuTitle="Region"
        setRegionFilter={setRegionFilter}
        setTypeFilter={setTypeFilter}
      />
      <FilterSelect
        optionsArr={typesArr}
        menuTitle="Type"
        setRegionFilter={setRegionFilter}
        setTypeFilter={setTypeFilter}
      />
    </div>
  );
}
