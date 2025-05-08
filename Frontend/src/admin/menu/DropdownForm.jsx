import React, { useState } from 'react';

export default function DropdownForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="border rounded shadow-md">
        {/* Dropdown toggle */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full text-left px-4 py-2 bg-indigo-600 text-white font-semibold rounded-t"
        >
          {isOpen ? 'Hide Form' : 'Show Form'}
        </button>

        {/* Dropdown content */}
        {isOpen && (
          <div className="p-4 bg-white border-t space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your email"
              />
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
