import React from 'react';

const departmentsData = [
  { name: 'Careers', total: 20 },
  { name: 'Education', total: 15 },
  { name: 'Destination', total: 12 },
  { name: 'Visa', total: 28 },
];

const BlogStats = () => {
  // Calculate the total of all departments to normalize the bar widths
  const totalSum = departmentsData.reduce((sum, dept) => sum + dept.total, 0);

  return (
    <div className=" p-4 w-full lg:w-[50%] bg-white drop-shadow-md rounded-[1rem]">
      <h5 className="mb-4 pb-2 border-b border-gray-300 font-jamjure">Blogs by Category</h5>
      {departmentsData.map((dept, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <span className='font-poppins text-[14px]'>{dept.name}</span>
            <span className='font-poppins text-[14px] font-[600]'>{dept.total.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded ">
            <div
              className="bg-indigo-400 h-2 rounded"
              style={{ width: `${(dept.total / totalSum) * 100}%` }} // Calculate width based on total sum
            ></div>
          </div>
          {/* Optional: Display percentage next to the bar */}
          <div className="text-right text-[12px]  text-indigo-600 font-[600]">
            {(dept.total / totalSum * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogStats;
