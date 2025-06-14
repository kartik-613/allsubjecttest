import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../components/button";
import Select from "react-select"; // ✅ import react-select
import { Label, FormGroup } from "reactstrap"; // ✅ Assuming you're using Reactstrap or similar

const FormPage = () => {
  const navigate = useNavigate();

  const textTypeOptions = [
    "Assessment",
    "Certification",
    "Coding Challenge",
    "Decision Making",
    "Practice Test",
    "Psychometrics",
    "Survey",
  ];

  const topicOptionsMap = {
    Assessment: ["Math", "Science", "English"],
    Certification: ["AWS", "Azure", "GCP"],
    Survey: ["Feedback", "Customer Satisfaction"],
    "Coding Challenge": ["JavaScript", "Python", "C++"],
    "Decision Making": ["Business", "Strategy", "Ethics"],
    "Practice Test": ["General", "Mock Test"],
  };

  const courseOptions = [
    { value: "MBA", label: "MBA" },
    { value: "Data Science", label: "Data Science" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    textTypes: "Assessment",
    topic: "",
    selectedTopics: [],
    preferredCourses: [],
    numberOfQuestions: "",
    level: "",
    markPerQuestion: "",
    timePerQuestion: "",
    scoringMethod: "",
    numberOfSets: "",
    validDate: "",
  });

  const isPsychometrics = formData.textTypes === "Psychometrics";
  const showOnlyTopic = ["Assessment", "Certification", "Survey"].includes(formData.textTypes);
  const showTopicAndLevel = formData.textTypes === "Coding Challenge";
  const showPreferredCourses = formData.textTypes === "Decision Making";
  const showFullFields = ![
    "Psychometrics",
    "Assessment",
    "Certification",
    "Survey",
    "Coding Challenge",
    "Decision Making",
  ].includes(formData.textTypes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (selected) => {
    setFormData((prev) => ({ ...prev, preferredCourses: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.textTypes === "Coding Challenge") {
      navigate("/editor");
    } else {
      navigate("/next");
    }
  };

  // Custom checkbox option for react-select
  const CheckboxOption = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="px-2 py-1 hover:bg-gray-100">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.preferredCourses.some((d) => d.value === data.value)}
          onChange={() => {}}
        />
        <span>{data.label}</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8 md:px-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form */}
        <div className="flex-1 flex flex-col space-y-5">
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">📋 Assessment Setup</h1>
              <span className="text-gray-600">📝 Fill the form to configure</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`rounded-xl border border-gray-300 p-5 bg-white grid gap-4 ${
              isPsychometrics ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {/* Test Type Selection */}
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
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Conditional Fields */}
            {!isPsychometrics && (
              <>
                {/* Decision Making: Preferred Courses */}
                {showPreferredCourses && (
                  <div className="col-span-1 md:col-span-2">
                    <FormGroup>
                      <Label for="Courses">Preferred Courses</Label>
                      <Select
                        inputId="Courses"
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: CheckboxOption }}
                        options={courseOptions}
                        value={formData.preferredCourses}
                        onChange={handleCourseChange}
                        styles={{
                          option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                              ? "#f8f9fa"
                              : state.isFocused
                              ? "#f1f1f1"
                              : "white",
                            color: "black",
                          }),
                        }}
                      />
                    </FormGroup>
                  </div>
                )}

                {/* Show topic for other types */}
                {(showOnlyTopic || showTopicAndLevel || showFullFields) &&
                  !showPreferredCourses &&
                  topicOptionsMap[formData.textTypes] && (
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded outline-none w-full"
                      required
                    >
                      <option value="">Select Topic</option>
                      {topicOptionsMap[formData.textTypes].map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  )}

                {/* Coding Challenge: Level */}
                {showTopicAndLevel && (
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
                )}

                {/* Full field test types */}
                {showFullFields && (
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
                    <input
                      type="number"
                      name="numberOfQuestions"
                      value={formData.numberOfQuestions}
                      onChange={handleInputChange}
                      placeholder="Number of Questions"
                      className="border border-gray-300 p-2 rounded outline-none w-full"
                    />
                    <input
                      type="number"
                      name="markPerQuestion"
                      value={formData.markPerQuestion}
                      onChange={handleInputChange}
                      placeholder="Mark per Question"
                      className="border border-gray-300 p-2 rounded outline-none w-full"
                    />
                    <input
                      type="number"
                      name="timePerQuestion"
                      value={formData.timePerQuestion}
                      onChange={handleInputChange}
                      placeholder="Time per Question (minutes)"
                      className="border border-gray-300 p-2 rounded outline-none w-full"
                    />
                    <select
                      name="scoringMethod"
                      value={formData.scoringMethod}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      placeholder="Number of Sets"
                      className="border border-gray-300 p-2 rounded outline-none w-full"
                    />
                  </>
                )}
              </>
            )}

            {/* Date & Submit */}
            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="w-full md:w-1/2">
                <label className="block mb-1 text-sm text-gray-600 font-medium">
                  Valid Date
                </label>
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
