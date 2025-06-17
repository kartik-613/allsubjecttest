import React from "react";

const ContactTab = ({ facultyList }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-2 md:px-0 max-h-[430px] overflow-y-auto">
      {facultyList.map((faculty, index) => (
        <div
          key={index}
          className="p-5 border border-gray-300 rounded-lg bg-white shadow-sm flex items-start gap-4"
        >
          <img
            src={faculty.avatar}
            alt={faculty.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="text-lg font-semibold break-words">{faculty.name}</h3>
            <p className="text-sm text-gray-600 break-words">
              Subject: {faculty.subject}
            </p>
            <p className="text-sm text-blue-600 break-words">
              <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactTab;
