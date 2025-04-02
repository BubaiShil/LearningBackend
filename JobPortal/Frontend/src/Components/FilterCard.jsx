import { useJobStore } from "@/Store/useJobStore";
import { Filter } from "lucide-react"; // Lucide Filter icon
import { useEffect, useState } from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const {setSettingQuery} = useJobStore()
  const [selectedVal, setSelectedVal] = useState("");

  const handleValue = (val) => {
    console.log("Selected Value:", val.target.value); // ✅ Debug
    setSelectedVal(val.target.value);
  };

  useEffect(() => {
    setSettingQuery(selectedVal);
  }, [selectedVal,setSettingQuery]);

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-600" />
        <h1 className="font-bold text-lg">Filter Jobs</h1>
      </div>
      <hr className="mb-4" />

      {/* Filters */}
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h1 className="font-semibold text-md mb-2">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index} - ${idx}`;
            return (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  // id={itemId}
                  name={data.filterType}
                  value={item}
                  onChange={handleValue}
                  className="radio radio-sm radio-primary"
                />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
