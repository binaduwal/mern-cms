import React, { useContext, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterBar from "../reusables/FilterBar";
import Pagination from "../reusables/Pagination";
import { blogItems } from "../utils/Elements";
import { UserContext } from "../layout/UserLayout";

const Blogs = () => {
  const { menuOpen, toggleMenu, setMenuOpen } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");

  const handleCategoryBlog = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // Close the filter menu on category selection
  };

  // Filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "All Blogs"
      ? blogItems
      : blogItems.filter((blog) => blog.category === selectedCategory);

  const categoryList = [
    { id: 1, title: "All Blogs" },
    { id: 2, title: "Education" },
    { id: 3, title: "Destination" },
    { id: 4, title: "Careers" },
  ];
  return (
    <div>
      <div className=" container mt-[1rem]">
        <section className=" border-b-2 border-gray-200 pb-2 flex justify-between items-end">
          <h5 className=" font-jamjure">
            {selectedCategory}
          </h5>
          <button
            className="flex items-center gap-2 rounded-md px-2.5 lg:px-4"
            onClick={toggleMenu}
          >
            <FaFilter />
            <p className=" text-white">Filter Blogs</p>
          </button>
        </section>
        <FilterBar
          menuOpen={menuOpen}
          data={categoryList}
          toggleMenu={toggleMenu}
          onCategoryClick={handleCategoryBlog}
        />
        <Pagination data={filteredBlogs} />
      </div>
    </div>
  );
};

export default Blogs;
