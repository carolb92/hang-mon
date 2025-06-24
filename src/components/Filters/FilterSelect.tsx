import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import StyledButton from "../Button/StyledButton";
import { useGuessContext } from "@/context/useGuessContext";
import { RegionString, TypeString } from "@/lib/api/types";

type FilterProps = {
  optionsArr: string[];
  menuTitle: string;
};

export default function FilterSelect({ optionsArr, menuTitle }: FilterProps) {
  const { setRegion, setType } = useGuessContext(); //region, type
  // const defaultValue = menuTitle === "Region" ? region : type;

  function handleSelect(value: string) {
    if (menuTitle === "Region") {
      setRegion(value.toLowerCase() as RegionString);
    } else {
      setType(value.toLowerCase() as TypeString);
    }
  }

  return (
    <div className="rounded-lg border-2 border-blue-900 bg-yellow-100 p-1 font-semibold text-blue-900">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={menuTitle} />
        </SelectTrigger>
        <SelectContent className="bg-yellow-100 text-blue-900">
          {optionsArr.map((option) => {
            return (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {/* <StyledButton btnText="GO!" ></StyledButton> */}
    </div>
  );
}
