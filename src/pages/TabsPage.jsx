import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "../components/button";

ChartJS.register(ArcElement, Tooltip, Legend);

const TabsPage = () => {
  const location = useLocation();
  const { correct = 3, wrong = 1, unattempted = 1 } = location.state || {};
  const [activeTab, setActiveTab] = useState("result");

  const data = {
    labels: ["Correct", "Wrong", "Unattempted"],
    datasets: [
      {
        data: [correct, wrong, unattempted],
        backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
        borderColor: ["#059669", "#DC2626", "#D97706"],
        borderWidth: 1,
      },
    ],
  };

  const courseList = [
    {
      title: "Mathematics",
      description: "Master algebra, geometry, and calculus with this foundational course.",
      progress: 80,
    },
    {
      title: "Physics",
      description: "Explore mechanics, thermodynamics, and modern physics.",
      progress: 45,
    },
    {
      title: "Computer Science",
      description: "Introduction to programming, data structures, and algorithms.",
      progress: 60,
    },
  ];

  const facultyList = [
    {
      name: "Dr. Rakesh Sharma",
      subject: "Mathematics",
      email: "rakesh.sharma@example.com",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Prof. Neha Kapoor",
      subject: "Physics",
      email: "neha.kapoor@example.com",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Mr. Amit Desai",
      subject: "Computer Science",
      email: "amit.desai@example.com",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "result":
        return (
          <div className="mx-4 md:mx-10 my-5 text-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full max-w-[250px] md:max-w-sm">
              <Pie data={data} />
            </div>
            <div className="flex flex-col space-y-4 text-lg font-medium text-center md:text-left">
              <h3 className="text-xl font-semibold text-center md:text-left">Subject: Mathematics</h3>
              <div className="flex flex-col gap-4">
                <p className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 bg-black rounded-full inline-block" />
                  Correct: {correct}
                </p>
                <p className="flex items-center gap-2 text-red-600">
                  <span className="w-2 h-2 bg-black rounded-full inline-block" />
                  Wrong: {wrong}
                </p>
                <p className="flex items-center gap-2 text-yellow-600">
                  <span className="w-2 h-2 bg-black rounded-full inline-block" />
                  Unattempted: {unattempted}
                </p>
              </div>
            </div>
          </div>
        );

      case "course":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2 md:px-0">
            {courseList.map((course, index) => (
              <div key={index} className="p-5 border border-gray-300 rounded-lg shadow-sm bg-white">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-right text-blue-600">{course.progress}% complete</p>
              </div>
            ))}
          </div>
        );

      case "contact":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2 md:px-0">
            {facultyList.map((faculty, index) => (
              <div key={index} className="p-5 border border-gray-300 rounded-lg bg-white shadow-sm flex gap-4 items-center">
                <img
                  src={faculty.avatar}
                  alt={faculty.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{faculty.name}</h3>
                  <p className="text-sm text-gray-600">Subject: {faculty.subject}</p>
                  <p className="text-sm text-blue-600">
                    <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const tabButtonStyle = (tab) =>
    `py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 transition ${
      activeTab === tab
        ? "bg-blue-400 text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-10 py-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col space-y-5">
          {/* Header */}
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">🧭 Dashboard</h1>
              <div className="flex flex-wrap gap-2">
                <button className={tabButtonStyle("result")} onClick={() => setActiveTab("result")}>
                  Result
                </button>
                <button className={tabButtonStyle("course")} onClick={() => setActiveTab("course")}>
                  Course
                </button>
                <button className={tabButtonStyle("contact")} onClick={() => setActiveTab("contact")}>
                  Contact to Faculty
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-300 p-5 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-3 capitalize">{activeTab} Details</h2>
            {renderContent()}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col justify-between rounded-xl border border-gray-300 bg-white">
          <div className="p-5">
            <div className="flex items-center gap-5 border-b border-gray-300 pb-3 mb-3">
              <div className="rounded-full p-5 border border-gray-300 bg-gray-100 text-black text-xl font-semibold flex items-center justify-center w-16 h-16">
                Ab
              </div>
              <div>
                <h1 className="text-lg font-medium">User</h1>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>This panel mirrors the QuizApp layout and can show metrics, recent activity, etc.</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center py-4 border-t border-gray-300 text-white bg-blue-400 hover:bg-blue-500 rounded-b-xl cursor-pointer">
            <Button onClick={() => alert("Logged out!")}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsPage;
 