import React, { useContext, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterBar from "../reusables/FilterBar";
import Pagination from "../reusables/Pagination";
import { UserContext } from "../layout/UserLayout";
import { eventItems } from "../utils/Elements";

const Events = () => {
  const { menuOpen, toggleMenu, setMenuOpen } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  const handleCategoryEvent = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // Close the filter menu on category selection
  };

  // Filter Events based on selected category
  const filteredEvents =
    selectedCategory === "All Events"
      ? eventItems
      : eventItems.filter((event) => event.category === selectedCategory);

  const categoryList = [
    { id: 1, title: "All Events" },
    { id: 2, title: "Past Event" },
    { id: 3, title: "Ongoing Event" },
    { id: 4, title: "Upcoming Event" },
  ];

  return (
    <div>
      <div className=" container mt-[1rem]">
        <section className=" border-b-2 border-gray-200 pb-2 flex justify-between items-end">
          <h2 className=" font-[550] text-[18px] lg:text-[20px]">
            {selectedCategory}
          </h2>
          <button
            className="flex items-center gap-2 rounded-md px-2.5 lg:px-4"
            onClick={toggleMenu}
          >
            <FaFilter />
            <h3 className=" text-white">Filter Events</h3>
          </button>
        </section>
        <FilterBar
          menuOpen={menuOpen}
          data={categoryList}
          toggleMenu={toggleMenu}
          onCategoryClick={handleCategoryEvent}
        />
        <Pagination data={filteredEvents} />
      </div>
      
    </div>
  );
};

export default Events;
