import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGuessContext } from "@/context/useGuessContext";
import { RegionString, TypeString } from "@/lib/api/types";
import { getAvailableTypesForRegion, getAvailableRegionsForType } from "@/lib/api/type-compatibility";

type FilterProps = {
  optionsArr: string[];
  menuTitle: string;
};

export default function FilterSelect({ optionsArr, menuTitle }: FilterProps) {
  const { setRegion, setType, guessesRemaining, region, type } = useGuessContext();
  const isGuessInProgress = guessesRemaining < 7;

  function handleSelect(value: string) {
    if (menuTitle === "Region") {
      setRegion(value.toLowerCase() as RegionString);
    } else {
      setType(value.toLowerCase() as TypeString);
    }
  }

  function isOptionDisabled(option: string): boolean {
    const optionLower = option.toLowerCase();
    
    // "All" option is never disabled
    if (optionLower === "all") return false;
    
    if (menuTitle === "Region") {
      // Disable regions that don't have the selected type
      if (type !== "all") {
        const availableRegions = getAvailableRegionsForType(type as TypeString);
        return !availableRegions.includes(optionLower as RegionString);
      }
    } else if (menuTitle === "Type") {
      // Disable types that aren't available in the selected region
      if (region !== "all") {
        const availableTypes = getAvailableTypesForRegion(region as RegionString);
        return !availableTypes.includes(optionLower as TypeString);
      }
    }
    
    return false;
  }

  return (
    <div className="rounded-lg border-2 border-blue-900 bg-yellow-100 p-1 font-semibold text-blue-900">
      <Select onValueChange={handleSelect} disabled={isGuessInProgress}>
        <SelectTrigger className="font-utility w-[100px]">
          <SelectValue placeholder={menuTitle} />
        </SelectTrigger>
        <SelectContent className="font-utility bg-yellow-100 text-blue-900">
          {optionsArr.map((option) => {
            const disabled = isOptionDisabled(option);
            return (
              <SelectItem 
                key={option} 
                value={option} 
                disabled={disabled}
                className={disabled ? "text-gray-400 cursor-not-allowed" : ""}
              >
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
