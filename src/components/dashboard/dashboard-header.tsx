import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const DashboardHeader = ({
  search,
  setSearch,
  setIsModalOpen,
}: Readonly<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between px-10 gap-4">
      <h1 className="text-2xl text-gray-700 text-center md:text-left">Tasks</h1>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="relative p-3 rounded-xl bg-gray-200 flex items-center gap-2 md:w-[200px]">
          <FaMagnifyingGlass
            className={`h-4 transition-all duration-300 ease-in-out ${
              isSearching || search ? "w-0 opacity-0" : "w-4 opacity-100"
            }`}
          />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search by task name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={() => {
              setIsSearching(true);
            }}
            onBlur={() => {
              setIsSearching(false);
            }}
          />
        </div>
        <button
          className="text-white flex gap-2 bg-blue-400 rounded-md p-3 justify-center items-center hover:bg-blue-500 transition-colors"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <BiPlus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
};
