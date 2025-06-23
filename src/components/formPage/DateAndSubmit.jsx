// 📁 src/components/form/DateAndSubmit.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../Button";

const DateAndSubmit = ({ startDate, endDate, onDateChange, onSubmit }) => (
  <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-4 justify-between">
    <div className="w-full">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onDateChange}
        monthsShown={2}
        dateFormat="dd/MM/yyyy"
        className="w-full border border-gray-300 p-2 rounded outline-none text-sm"
        placeholderText="📅 Select valid date range"
        isClearable
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        popperPlacement="bottom-start"
      />
    </div>
    <div className="w-full md:w-auto mt-4 md:mt-6">
      <Button
        type="submit"
        className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 w-full md:w-auto"
        onClick={onSubmit}
      >
        Next
      </Button>
    </div>
  </div>
);

export default DateAndSubmit;