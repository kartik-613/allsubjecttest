// 📁 src/components/form/TestTypeSelector.jsx
import React from "react";

const TestTypeSelector = ({ options, selected, onChange }) => (
  <fieldset className="col-span-1 md:col-span-2 border border-gray-300 p-3 rounded">
    <legend className="font-semibold mb-2">Test Type</legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((type) => (
        <label key={type} className="flex items-center gap-2">
          <input
            type="radio"
            name="textTypes"
            value={type}
            checked={selected === type}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

export default TestTypeSelector;