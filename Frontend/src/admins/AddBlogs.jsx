import React, { useState } from "react";
import { blogItems } from "../utils/Elements";
import CustomButton from "../reusables/CustomButton";
import { RxPlus } from "react-icons/rx";
import { useSelector } from "react-redux";
import AdminBlogs from "./AdminBlogs";
import BlogStats from "./BlogStats";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const { blogs } = useSelector((state) => state.blogslice);
  console.log("blog details:", blogs);

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
  const navigate=useNavigate();

  return (
    <div>
    <div className=" flex lg:flex-row flex-col justify-between gap-8 items-center">
    <div className=" h-[13rem] lg:h-[18rem] rounded-[1.5rem] relative group w-full flex items-end">
          <div
            className="absolute inset-0 bg-center bg-cover rounded-[1.5rem] bg-no-repeat brightness-75"
            style={{
              backgroundImage: `url("https://martech.org/wp-content/uploads/2014/07/blog-tablet-mobile-600.jpg")`,
            }}
          />
          <section className="space-y-2 relative w-full bg-gray-600 bg-opacity-50  backdrop-blur  py-4 px-3 lg:px-6 rounded-b-[1.5rem] ">
          <h3 className=" font-jamjure text-white">Design in the age of AI: How to adapt easily.</h3>
          <p className=" text-white caption ">With slothUI you can unleash your inner GenZ and stop caring about anything else.</p>
          </section>
        </div>
          <BlogStats/>
        </div>
      <div className="mt-[2rem]">
        <div className=" flex flex-col-reverse lg:flex-row gap-4 justify-between items-end"> {/* Adjust pb-1 to align */}
          <div className="flex gap-4 lg:gap-6 items-end"> {/* Added items-end to align titles */}
            {categoryList.map((item) => {
              return (
                <h6
                  key={item.id}
                  className={`font-jamjure font-[600] cursor-pointer duration-300 pb-1 ${
                    selectedCategory === item.title
                      ? "border-b-2 border-indigo-500 text-indigo-500"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(item.title)} // Set selected category on click
                >
                  {item.title}
                </h6>
              );
            })}
          </div>

          <section className="flex gap-3 items-center">
            <CustomButton color="bg-green-500" onClick={()=>navigate("/admin/blogform")}>
              <span className="flex items-center gap-x-2">
                <RxPlus className="text-[1rem]" />
                Create New Blog
              </span>
            </CustomButton>
          </section>
        </div>
        <AdminBlogs data={filteredBlogs} />
      </div>
    </div>
  );
};

export default AddBlogs;
