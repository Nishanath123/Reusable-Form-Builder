import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminPanel = ({ onFormUpdate, setFormType }) => {
  const [formTypeInput, setFormTypeInput] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [options, setOptions] = useState("");
  const [allowedExtensions, setAllowedExtensions] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [fields, setFields] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSetFormType = () => setFormType(formTypeInput);

  const handleAddField = () => {
    if (!fieldLabel || !fieldName) return;

    const newField = {
      label: fieldLabel,
      name: fieldName,
      type: fieldType,
      options: fieldType === "select" || fieldType === "radio" ? options.split(",") : null,
      allowedExtensions: fieldType === "file" ? allowedExtensions.split(",") : null,
      required: isRequired,
    };

    let updatedFields;
    if (editIndex !== null) {
      updatedFields = [...fields];
      updatedFields[editIndex] = newField;
      setEditIndex(null);
    } else {
      updatedFields = [...fields, newField];
    }

    setFields(updatedFields);
    onFormUpdate(updatedFields);

    setFieldLabel("");
    setFieldName("");
    setOptions("");
    setAllowedExtensions("");
    setIsRequired(false);
  };

  const handleEditField = (index) => {
    const field = fields[index];
    setFieldLabel(field.label);
    setFieldName(field.name);
    setFieldType(field.type);
    setOptions(field.options ? field.options.join(",") : "");
    setAllowedExtensions(field.allowedExtensions ? field.allowedExtensions.join(",") : "");
    setIsRequired(field.required);
    setEditIndex(index);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    onFormUpdate(updatedFields);
  };

  const handleClearAll = () => {
    setFields([]);
    onFormUpdate([]);
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg w-1/2">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>

      <input type="text" placeholder="Form Type" className="w-full p-2 border rounded" value={formTypeInput} onChange={(e) => setFormTypeInput(e.target.value)} />
      <button onClick={handleSetFormType} className="w-full p-2 bg-blue-500 text-white rounded mt-2">Set Form Type</button>

      <input type="text" placeholder="Field Label" className="w-full p-2 border rounded mt-2" value={fieldLabel} onChange={(e) => setFieldLabel(e.target.value)} />
      <input type="text" placeholder="Field Name" className="w-full p-2 border rounded mt-2" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />

      <select className="w-full p-2 border rounded mt-2" value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="password">Password</option>
        <option value="date">Date</option>
        <option value="select">Dropdown</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="file">File Upload</option>
      </select>

      {(fieldType === "select" || fieldType === "radio") && (
        <input type="text" placeholder="Comma-separated options" className="w-full p-2 border rounded mt-2" value={options} onChange={(e) => setOptions(e.target.value)} />
      )}

      {fieldType === "file" && (
        <input type="text" placeholder="Allowed extensions (e.g., jpg,pdf)" className="w-full p-2 border rounded mt-2" value={allowedExtensions} onChange={(e) => setAllowedExtensions(e.target.value)} />
      )}

      <div className="mt-2 flex items-center">
        <input type="checkbox" checked={isRequired} onChange={() => setIsRequired(!isRequired)} />
        <label className="ml-2">Required</label>
      </div>

      <button onClick={handleAddField} className={`w-full p-2 text-white rounded mt-2 ${editIndex !== null ? "bg-yellow-500" : "bg-green-500"}`}>
        {editIndex !== null ? "Update Field" : "Add Field"}
      </button>

      <button onClick={handleClearAll} className="w-full p-2 bg-red-500 text-white rounded mt-2">Clear All</button>

      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mt-2">
            <span>{field.label} ({field.type}) {field.required && <span className="text-red-500">*</span>}</span>
            <div className="flex space-x-2">
              <button onClick={() => handleEditField(index)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => handleRemoveField(index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
