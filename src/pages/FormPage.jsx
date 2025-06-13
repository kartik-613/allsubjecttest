import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../components/button";

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    textTypes: "Practice Test",
    subject: "",
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
    "Practice Test",
    "Decision Making",
    "Assessment",
    "Certification",
    "Survey",
    "Psychometrics",
  ];

  const subjectOptionsMap = {
    "Practice Test": ["Math", "Science", "English"],
    "Decision Making": ["Logic", "Ethics", "Critical Thinking"],
    "Assessment": ["Aptitude", "Reasoning"],
    "Certification": ["AWS", "Azure", "GCP"],
    "Survey": ["Customer Feedback", "Employee Satisfaction"],
    "Psychometrics": ["Personality", "IQ", "EQ"],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "textTypes") {
      setFormData((prev) => ({
        ...prev,
        textTypes: value,
        subject: "",
      }));
    } else if (name === "timePerQuestion") {
      setFormData((prev) => ({
        ...prev,
        timePerQuestion: parseInt(value || 0) * 60,
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
    <div className="min-h-screen bg-white text-black px-4 py-8 md:px-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col space-y-5">
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📋 Assessment Setup</h1>
              <span className="text-gray-600">📝 Fill the form to configure</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-300 p-5 bg-white grid gap-4 grid-cols-1 md:grid-cols-2"
          >
            <fieldset className="col-span-1 md:col-span-2 border border-gray-300 p-3 rounded">
              <legend className="font-semibold mb-2">Test Type</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {textTypeOptions.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="textTypes"
                      value={type}
                      checked={formData.textTypes === type}
                      onChange={handleInputChange}
                    />
                    <span className="whitespace-nowrap">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Subject Dropdown */}
            {formData.textTypes &&
              subjectOptionsMap[formData.textTypes] && (
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded outline-none w-full"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjectOptionsMap[formData.textTypes].map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              )}

            {/* Title & Objective (conditional) */}
            {formData.textTypes !== "Assessment" && (
              <>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                  className="border border-gray-300 p-2 rounded outline-none w-full"
                />
                <input
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  placeholder="Objective"
                  required
                  className="border border-gray-300 p-2 rounded outline-none w-full"
                />
              </>
            )}

            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleInputChange}
              placeholder="Number of Questions"
              className="border border-gray-300 p-2 rounded outline-none w-full"
              required
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded outline-none w-full"
              required
            >
              <option value="">Select Test Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="number"
              name="markPerQuestion"
              value={formData.markPerQuestion}
              onChange={handleInputChange}
              placeholder="Mark per Question"
              className="border border-gray-300 p-2 rounded outline-none w-full"
              required
            />

            <input
              type="number"
              name="timePerQuestion"
              value={formData.timePerQuestion / 60 || ""}
              onChange={handleInputChange}
              placeholder="Time per Question (in minutes)"
              className="border border-gray-300 p-2 rounded outline-none w-full"
              min="0"
              required
            />

            <select
              name="scoringMethod"
              value={formData.scoringMethod}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded outline-none w-full"
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
              className="border border-gray-300 p-2 rounded outline-none w-full"
            />

            <input
              type="number"
              name="numberOfSets"
              value={formData.numberOfSets}
              onChange={handleInputChange}
              placeholder="Number of Sets"
              className="border border-gray-300 p-2 rounded outline-none w-full"
            />

           {/* ✅ Inline React DatePicker & Submit Button */}
<div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-4 justify-between">
  <div className="w-full md:w-1/2">
    <label className="block mb-1 text-sm text-gray-600 font-medium">Valid Date</label>
    <DatePicker
      selected={formData.validDate ? new Date(formData.validDate) : null}
      onChange={(date) =>
        setFormData((prev) => ({
          ...prev,
          validDate: date.toISOString().split("T")[0],
        }))
      }
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
      className="w-full border border-gray-300 p-2 rounded-md outline-none"
      required
    />
  </div>

  <div className="w-full md:w-auto mt-4 md:mt-6">
    <Button
      type="submit"
      className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 w-full md:w-auto"
    >
      Next
    </Button>
  </div>
</div>

          </form>
        </div>

        {/* Sidebar */}
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
            onClick={handleSubmit}
            className="w-full text-white bg-blue-400 hover:bg-blue-500 rounded-b-xl py-3"
          >
            Save & Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
