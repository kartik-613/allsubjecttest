
// 📁 src/components/form/CourseMultiSelect.jsx
import React from "react";
import Select from "react-select";
import { Label, FormGroup } from "reactstrap";

const CheckboxOption = ({ data, innerRef, innerProps }) => (
  <div ref={innerRef} {...innerProps} className="px-2 py-1 hover:bg-gray-100">
    <label className="flex items-center space-x-2">
      <input type="checkbox" checked readOnly />
      <span>{data.label}</span>
    </label>
  </div>
);

const CourseMultiSelect = ({ options, selected, onChange }) => (
  <div className="col-span-1 md:col-span-2">
    <FormGroup>
      <Label for="Courses">Preferred Courses</Label>
      <Select
        inputId="Courses"
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option: CheckboxOption }}
        options={options}
        value={selected}
        onChange={onChange}
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
);

export default CourseMultiSelect;