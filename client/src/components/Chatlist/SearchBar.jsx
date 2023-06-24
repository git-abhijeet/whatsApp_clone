import React from "react";
import { BiSearchAlt2 } from "react-icons/bi"
import { BsFilter } from "react-icons/bs"

function SearchBar() {
  return (
    <div className="flex items-center gap-3 py-3 pl-5 bg-search-input-container-background h-14">
      <div className="flex items-center flex-grow gap-5 px-3 py-1 rounded-lg bg-panel-header-background">
        <div className="">
          <BiSearchAlt2 className="cursor-pointer text-l text-panel-header-icon" />
        </div>
        <div>
          <input type="text" placeholder="Search or start a new chat" className="w-full text-sm text-white bg-transparent focus:outline-none" />
        </div>
      </div>
      <div className="pl-3 pr-5">
        <BsFilter className="cursor-pointer text-l text-panel-header-icon" />
      </div>
    </div>
  );
}

export default SearchBar;
