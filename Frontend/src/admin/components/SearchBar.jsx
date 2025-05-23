import React from 'react'
import { CiSearch } from "react-icons/ci"

const SearchBar = ({ searchTerm, handleSearch }) => (
    <div className="relative w-1/4">
      <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 p-1 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  )


export default SearchBar