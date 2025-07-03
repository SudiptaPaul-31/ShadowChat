import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative px-4 py-3">
      <div className="relative ">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2  text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
};

export default SearchBar;
