import React from "react";

const InputField = ({ type, name, value, onChange, placeholder, error }) => (
  <div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={name}
      className="border border-gray-300 p-2 rounded outline-none text-sm w-full"
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
