import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useState } from "react";

type FilterProps = {
  optionsArr: string[];
  menuTitle: string;
  setRegionFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function FilterSelect({
  optionsArr,
  menuTitle,
  setRegionFilter,
  setTypeFilter,
}: FilterProps) {
  // const [regionFilter, setRegionFilter] = useState("all");
  // const [typeFilter, setTypeFilter] = useState("all");

  function handleSelect(value: string) {
    if (menuTitle === "Region") {
      setRegionFilter(value);
    } else {
      setTypeFilter(value);
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
    </div>
  );
}
