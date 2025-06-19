// 📁 src/components/form/AdditionalFields.jsx
import React from "react";

const AdditionalFields = ({ formData, onChange }) => (
  <>
    <input
      name="title"
      value={formData.title}
      onChange={onChange}
      placeholder="Title"
      required
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
    <input
      name="objective"
      value={formData.objective}
      onChange={onChange}
      placeholder="Objective"
      required
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
    <input
      type="number"
      name="numberOfQuestions"
      value={formData.numberOfQuestions}
      onChange={onChange}
      placeholder="Number of Questions"
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
    <input
      type="number"
      name="markPerQuestion"
      value={formData.markPerQuestion}
      onChange={onChange}
      placeholder="Mark per Question"
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
    <input
      type="number"
      name="timePerQuestion"
      value={formData.timePerQuestion}
      onChange={onChange}
      placeholder="Time per Question (minutes)"
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
    <select
      name="scoringMethod"
      value={formData.scoringMethod}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded outline-none w-full"
    >
      <option value="">Select Scoring Method</option>
      <option value="total">Total</option>
      <option value="average">Average</option>
    </select>
    <input
      type="number"
      name="numberOfSets"
      value={formData.numberOfSets}
      onChange={onChange}
      placeholder="Number of Sets"
      className="border border-gray-300 p-2 rounded outline-none w-full"
    />
  </>
);

export default AdditionalFields;