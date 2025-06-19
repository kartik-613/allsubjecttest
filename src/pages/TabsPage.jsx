import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "../components/button";
import ResultTab from "./TabsPage/ResultTab";
import CourseTab from "./TabsPage/CourseTab";
import ContactTab from "./TabsPage/ContactTab";

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

  // ✅ Correct full course data
  const courseList = [
    {
      title: "Mathematics",
      description: "Master algebra, geometry, and calculus.",
      duration: "6 weeks",
      startDate: "2025-07-01",
      image: "https://i.pravatar.cc/100?img=1",
      progress: 80,
    },
        {
      title: "Physics",
      description: "Explore mechanics, thermodynamics, and more.",
      duration: "8 weeks",
      startDate: "2025-07-10",
      image: "https://i.pravatar.cc/100?img=2",
      progress: 45,
    },
        {
      title: "Computer Science",
      description: "Intro to programming, data structures, and algorithms.",
      duration: "10 weeks",
      startDate: "2025-07-15",
      image: "https://i.pravatar.cc/100?img=3",
      progress: 60,
    },
        {
      title: "Mathematics",
      description: "Master algebra, geometry, and calculus.",
      duration: "6 weeks",
      startDate: "2025-07-01",
      image: "https://i.pravatar.cc/100?img=1",
      progress: 80,
    },
        {
      title: "Physics",
      description: "Explore mechanics, thermodynamics, and more.",
      duration: "8 weeks",
      startDate: "2025-07-10",
      image: "https://i.pravatar.cc/100?img=2",
      progress: 45,
    },
        {
      title: "Computer Science",
      description: "Intro to programming, data structures, and algorithms.",
      duration: "10 weeks",
      startDate: "2025-07-15",
      image: "https://i.pravatar.cc/100?img=3",
      progress: 60,
    },
        {
      title: "Mathematics",
      description: "Master algebra, geometry, and calculus.",
      duration: "6 weeks",
      startDate: "2025-07-01",
      image: "https://i.pravatar.cc/100?img=1",
      progress: 80,
    },
        {
      title: "Physics",
      description: "Explore mechanics, thermodynamics, and more.",
      duration: "8 weeks",
      startDate: "2025-07-10",
      image: "https://i.pravatar.cc/100?img=2",
      progress: 45,
    },
        {
      title: "Computer Science",
      description: "Intro to programming, data structures, and algorithms.",
      duration: "10 weeks",
      startDate: "2025-07-15",
      image: "https://i.pravatar.cc/100?img=3",
      progress: 60,
    },
        {
      title: "Mathematics",
      description: "Master algebra, geometry, and calculus.",
      duration: "6 weeks",
      startDate: "2025-07-01",
      image: "https://i.pravatar.cc/100?img=1",
      progress: 80,
    },
    {
      title: "Physics",
      description: "Explore mechanics, thermodynamics, and more.",
      duration: "8 weeks",
      startDate: "2025-07-10",
      image: "https://i.pravatar.cc/100?img=2",
      progress: 45,
    },
    {
      title: "Computer Science",
      description: "Intro to programming, data structures, and algorithms.",
      duration: "10 weeks",
      startDate: "2025-07-15",
      image: "https://i.pravatar.cc/100?img=3",
      progress: 60,
    },
  ];

  // ✅ Correct faculty info
  const facultyList =[
  {
    name: "Dr. A. Sharma",
    subject: "Mathematics",
    email: "asharma@university.edu",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Prof. R. Verma",
    subject: "Physics",
    email: "rverma@university.edu",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
    {
    name: "Prof. V. Mehta",
    subject: "Statistics",
    email: "vmehta@university.edu",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Ms. H. Joshi",
    subject: "History",
    email: "hjoshi@university.edu",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Dr. R. Singh",
    subject: "Political Science",
    email: "rsingh@university.edu",
    avatar: "https://i.pravatar.cc/100?img=10",
  },
  {
    name: "Prof. A. Das",
    subject: "Geography",
    email: "adas@university.edu",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Ms. M. Khan",
    subject: "Philosophy",
    email: "mkhan@university.edu",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
    {
    name: "Prof. V. Mehta",
    subject: "Statistics",
    email: "vmehta@university.edu",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Ms. H. Joshi",
    subject: "History",
    email: "hjoshi@university.edu",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Dr. R. Singh",
    subject: "Political Science",
    email: "rsingh@university.edu",
    avatar: "https://i.pravatar.cc/100?img=10",
  },
  {
    name: "Prof. A. Das",
    subject: "Geography",
    email: "adas@university.edu",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Ms. N. Rao",
    subject: "Computer Science",
    email: "nrao@university.edu",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Dr. S. Gupta",
    subject: "Chemistry",
    email: "sgupta@university.edu",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Mr. K. Iyer",
    subject: "Biology",
    email: "kiyer@university.edu",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Ms. T. Desai",
    subject: "English",
    email: "tdesai@university.edu",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Dr. P. Reddy",
    subject: "Economics",
    email: "preddy@university.edu",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
  {
    name: "Prof. V. Mehta",
    subject: "Statistics",
    email: "vmehta@university.edu",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Ms. H. Joshi",
    subject: "History",
    email: "hjoshi@university.edu",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Dr. R. Singh",
    subject: "Political Science",
    email: "rsingh@university.edu",
    avatar: "https://i.pravatar.cc/100?img=10",
  },
  {
    name: "Prof. A. Das",
    subject: "Geography",
    email: "adas@university.edu",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Ms. M. Khan",
    subject: "Philosophy",
    email: "mkhan@university.edu",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

  const tabButtonStyle = (tab) =>
    `py-2 px-4 text-sm font-medium rounded-lg border border-gray-300 transition ${
      activeTab === tab
        ? "bg-blue-400 text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`;

  const renderContent = () => {
    switch (activeTab) {
      case "result":
        return (
          <ResultTab
            correct={correct}
            wrong={wrong}
            unattempted={unattempted}
            data={data}
          />
        );
      case "course":
        return <CourseTab courseList={courseList} />;
      case "contact":
        return <ContactTab facultyList={facultyList} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-6 lg:px-10 py-7">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col space-y-5">
          {/* Header with Tabs */}
          <div className="bg-white rounded-xl px-5 py-5 border border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl font-bold">🧭 Dashboard</h1>
              <div className="flex flex-wrap gap-2">
                <button
                  className={tabButtonStyle("result")}
                  onClick={() => setActiveTab("result")}
                >
                  Result
                </button>
                <button
                  className={tabButtonStyle("course")}
                  onClick={() => setActiveTab("course")}
                >
                  Course
                </button>
                <button
                  className={tabButtonStyle("contact")}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact to Faculty
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl border border-gray-300 p-5 min-h-[300px]">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {activeTab} Details
            </h2>
            {renderContent()}
          </div>
        </div>

        {/* Right Sidebar */}
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
              <p>
                This panel mirrors the QuizApp layout and can show metrics,
                recent activity, etc.
              </p>
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
