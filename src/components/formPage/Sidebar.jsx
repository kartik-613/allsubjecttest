// 📁 src/components/form/Sidebar.jsx
import React from "react";
import { Button } from "../Button";

const Sidebar = ({ onSubmit }) => (
  <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white lg:sticky lg:top-8">
    <div className="p-4 md:p-5">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-3 mb-4">
        <div className="rounded-full p-4 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
          AB
        </div>
        <div>
          <h1 className="text-lg font-medium">Admin Panel</h1>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Instructions</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Fill all required fields</li>
          <li>Use meaningful titles/objectives</li>
          <li>Choose appropriate question parameters</li>
        </ul>
      </div>
    </div>
    <Button
      onClick={onSubmit}
      className="w-full text-white bg-blue-400 hover:bg-blue-500 rounded-b-xl py-3"
    >
      Save & Proceed
    </Button>
  </div>
);

export default Sidebar;
