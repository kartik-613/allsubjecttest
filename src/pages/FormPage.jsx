import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestTypeSelector from "../components/form/TestTypeSelector";
import TopicSelector from "../components/form/TopicSelector";
import CourseMultiSelect from "../components/form/CourseMultiSelect";
import AdditionalFields from "../components/form/AdditionalFields";
import DateAndSubmit from "../components/form/DateAndSubmit";
import Sidebar from "../components/form/Sidebar";

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

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8 md:px-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
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
            <TestTypeSelector
              options={textTypeOptions}
              selected={formData.textTypes}
              onChange={handleInputChange}
            />

            {!isPsychometrics && (
              <>
                {showPreferredCourses && (
                  <CourseMultiSelect
                    options={courseOptions}
                    selected={formData.preferredCourses}
                    onChange={handleCourseChange}
                  />
                )}

                {(showOnlyTopic || showTopicAndLevel || showFullFields) &&
                  !showPreferredCourses &&
                  topicOptionsMap[formData.textTypes] && (
                    <TopicSelector
                      topicOptions={topicOptionsMap[formData.textTypes]}
                      selected={formData.topic}
                      onChange={handleInputChange}
                    />
                  )}

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

                {showFullFields && (
                  <AdditionalFields formData={formData} onChange={handleInputChange} />
                )}
              </>
            )}

            <DateAndSubmit
              startDate={startDate}
              endDate={endDate}
              onDateChange={(update) => setDateRange(update)}
              onSubmit={handleSubmit}
            />
          </form>
        </div>

        {/* Sidebar Section */}
        <Sidebar onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default FormPage;
