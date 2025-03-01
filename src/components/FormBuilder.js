import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormBuilder = ({ fields, formType }) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    // Convert file objects to file names for displaying in JSON response
    const formattedData = { ...data };
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof FileList) {
        formattedData[key] = data[key][0]?.name || "No file uploaded";
      }
    });

    setSubmittedData(formattedData);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-1/2">
      <h3 className="text-lg font-bold mb-2">{formType || "Dynamic Form"}</h3>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {fields.map((field, index) => (
          <div key={index} className="mb-2">
            {/* Field Label */}
            <label className="block text-sm font-medium flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}:
            </label>

            {/* Input Fields */}
            {field.type === "file" ? (
              <input
                type="file"
                {...register(field.name, { required: field.required })}
                accept={field.allowedExtensions ? field.allowedExtensions.join(",") : "*"}
                className="w-full border p-2"
              />
            ) : field.type === "date" ? (
              <DatePicker
                selected={watch(field.name)}
                onChange={(date) => setValue(field.name, date)}
                className="w-full border p-2"
              />
            ) : field.type === "select" ? (
              <select {...register(field.name, { required: field.required })} className="w-full border p-2">
                <option value="">Select</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              <div className="flex">
                {field.options.map((option, i) => (
                  <label key={i} className="mr-2">
                    <input
                      type="radio"
                      value={option}
                      {...register(field.name, { required: field.required })}
                      className="mr-1"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : field.type === "checkbox" ? (
              <input type="checkbox" {...register(field.name)} className="mr-2" />
            ) : (
              <input
                type={field.type}
                {...register(field.name, { required: field.required })}
                className="w-full border p-2"
              />
            )}

            {/* Validation Error Messages */}
            {errors[field.name] && <p className="text-red-500 text-xs">This field is required</p>}
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-4 flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          <button type="button" onClick={() => reset()} className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
        </div>
      </form>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold">Submitted Data</h3>
          <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
