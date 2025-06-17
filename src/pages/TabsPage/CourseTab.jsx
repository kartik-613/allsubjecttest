import React from "react";

const CourseTab = ({ courseList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2 md:px-0 max-h-[430px] overflow-y-auto">
      {courseList.map((course, index) => (
        <div
          key={index}
          className="p-5 border border-gray-300 rounded-lg shadow-sm bg-white flex flex-col items-center text-center gap-3 "
        >
          {/* Profile Photo */}
          <img
            src={course.image || "https://via.placeholder.com/100"}
            alt={`${course.title} icon`}
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* Course Title */}
          <h3 className="text-lg font-semibold">{course.title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600">{course.description}</p>

          {/* Course Details */}
          <div className="text-sm text-gray-700 w-full text-left">
            <p>
              <span className="font-medium">📅 Duration:</span>{" "}
              {course.duration || "8 weeks"}
            </p>
            <p>
              <span className="font-medium">🚀 Start Date:</span>{" "}
              {course.startDate || "1 July 2025"}
            </p>
          </div>

          {/* Register Button */}
          <button
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg transition"
            onClick={() => alert(`Registered for ${course.title}`)}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseTab;
