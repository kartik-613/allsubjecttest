// // src/pages/FormPage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FormPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     objective: "",
//     textTypes: [],
//     numberOfQuestions: "",
//     level: "",
//     markPerQuestion: "",
//     timePerQuestion: "",
//     scoringMethod: "",
//     weightageAverage: "",
//     numberOfSets: "",
//     validDate: "",
//   });

//   const textTypeOptions = [
//     "Mock Test",
//     "Design Making",
//     "Assessment",
//     "Certification",
//     "Survey",
//     "Psychometrics",
//   ];

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         textTypes: checked
//           ? [...prev.textTypes, value]
//           : prev.textTypes.filter((v) => v !== value),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     navigate("/next"); // go to the next page
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8">
//       <h1 className="text-2xl font-bold mb-4">Assessment Setup</h1>
//       <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">

//         <input
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder="Title"
//           required
//           className="border p-2 rounded"
//         />

//         <input
//           name="objective"
//           value={formData.objective}
//           onChange={handleInputChange}
//           placeholder="Objective"
//           required
//           className="border p-2 rounded"
//         />

//         <fieldset className="col-span-2 border p-3 rounded">
//           <legend className="font-semibold mb-2">Text Type</legend>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//             {textTypeOptions.map((type) => (
//               <label key={type} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="textTypes"
//                   value={type}
//                   onChange={handleInputChange}
//                 />
//                 {type}
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <input
//           type="number"
//           name="numberOfQuestions"
//           value={formData.numberOfQuestions}
//           onChange={handleInputChange}
//           placeholder="Number of Questions"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           name="level"
//           value={formData.level}
//           onChange={handleInputChange}
//           placeholder="Level (Easy/Medium/Hard)"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           type="number"
//           name="markPerQuestion"
//           value={formData.markPerQuestion}
//           onChange={handleInputChange}
//           placeholder="Mark per Question"
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           type="number"
//           name="timePerQuestion"
//           value={formData.timePerQuestion}
//           onChange={handleInputChange}
//           placeholder="Time per Question (seconds)"
//           className="border p-2 rounded"
//           required
//         />

//         <select
//           name="scoringMethod"
//           value={formData.scoringMethod}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//           required
//         >
//           <option value="">Select Scoring Method</option>
//           <option value="total">Total</option>
//           <option value="average">Average</option>
//           <option value="weighted">Weighted Average</option>
//         </select>

//         <input
//           type="number"
//           name="weightageAverage"
//           value={formData.weightageAverage}
//           onChange={handleInputChange}
//           placeholder="Weightage Average"
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="numberOfSets"
//           value={formData.numberOfSets}
//           onChange={handleInputChange}
//           placeholder="Number of Sets"
//           className="border p-2 rounded"
//         />

//         <input
//           type="date"
//           name="validDate"
//           value={formData.validDate}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//           required
//         />

//         <div className="col-span-2 flex justify-end">
//           <button
//             type="submit"
//             className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500"
//           >
//             Next
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormPage;




// src/pages/FormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    textTypes: [],
    numberOfQuestions: "",
    level: "",
    markPerQuestion: "",
    timePerQuestion: "",
    scoringMethod: "",
    weightageAverage: "",
    numberOfSets: "",
    validDate: "",
  });

  const textTypeOptions = [
    "Mock Test",
    "Design Making",
    "Assessment",
    "Certification",
    "Survey",
    "Psychometrics",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        textTypes: checked
          ? [...prev.textTypes, value]
          : prev.textTypes.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    navigate("/next");
  };

  return (
    <div className="min-h-screen bg-white text-black px-10 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel - Form */}
        <div className="flex-1 flex flex-col space-y-5">
          {/* Header */}
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📋 Assessment Setup</h1>
              <span className="text-gray-600">📝 Fill the form to configure</span>
            </div>
          </div>

          {/* Form Box */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-300 p-5 bg-white grid gap-4 grid-cols-1 md:grid-cols-2"
          >
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
              className="border border-gray-300 p-2 rounded outline-none"
            />

            <input
              name="objective"
              value={formData.objective}
              onChange={handleInputChange}
              placeholder="Objective"
              required
              className="border border-gray-300 p-2 rounded outline-none"
            />

            <fieldset className="col-span-2 border border-gray-300 p-3 rounded">
              <legend className="font-semibold mb-2">Test Type</legend>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {textTypeOptions.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="testTypes"
                      value={type}
                      onChange={handleInputChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>

            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleInputChange}
              placeholder="Number of Questions"
              className="border border-gray-300 p-2 rounded outline-none"
              required
            />

            <input
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              placeholder="Level (Easy/Medium/Hard)"
              className="border border-gray-300 p-2 rounded outline-none"
              required
            />

            <input
              type="number"
              name="markPerQuestion"
              value={formData.markPerQuestion}
              onChange={handleInputChange}
              placeholder="Mark per Question"
              className="border border-gray-300 p-2 rounded outline-none"
              required
            />

            <input
              type="number"
              name="timePerQuestion"
              value={formData.timePerQuestion}
              onChange={handleInputChange}
              placeholder="Time per Question (seconds)"
              className="border border-gray-300 p-2 rounded outline-none"
              required
            />

            <select
              name="scoringMethod"
              value={formData.scoringMethod}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded outline-none"
              required
            >
              <option value="">Select Scoring Method</option>
              <option value="total">Total</option>
              <option value="average">Average</option>
              <option value="weighted">Weighted Average</option>
            </select>

            <input
              type="number"
              name="weightageAverage"
              value={formData.weightageAverage}
              onChange={handleInputChange}
              placeholder="Weightage Average"
              className="border border-gray-300 p-2 rounded outline-none"
            />

            <input
              type="number"
              name="numberOfSets"
              value={formData.numberOfSets}
              onChange={handleInputChange}
              placeholder="Number of Sets"
              className="border border-gray-300 p-2 rounded outline-none"
            />

            <input
              type="date"
              name="validDate"
              value={formData.validDate}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded outline-none"
              required
            />

            <div className="col-span-2 flex justify-end">
              <Button type="submit" className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500">
                Next
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
          <div className="p-5">
            <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
              <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
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

          <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-bl-xl rounded-br-xl cursor-pointer">
            <Button onClick={handleSubmit}>Save & Proceed</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
