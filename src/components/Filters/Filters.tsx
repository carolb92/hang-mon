import FilterSelect from "@/components/Filters/FilterSelect";

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
    <div className="flex w-[360px] flex-col items-center justify-between gap-y-2 md:flex-row">
      <span className="text-xl font-semibold text-blue-950">Filter by:</span>
      <div className="flex w-full flex-row justify-center gap-x-4 md:w-auto">
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
    </div>
  );
}
