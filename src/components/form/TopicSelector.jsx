// 📁 src/components/form/TopicSelector.jsx
import React from "react";

const TopicSelector = ({ topicOptions, selected, onChange }) => (
  <select
    name="topic"
    value={selected}
    onChange={onChange}
    className="border border-gray-300 p-2 rounded outline-none w-full"
    required
  >
    <option value="">Select Topic</option>
    {topicOptions.map((topic) => (
      <option key={topic} value={topic}>
        {topic}
      </option>
    ))}
  </select>
);

export default TopicSelector;