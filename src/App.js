import React, { useState } from "react";
import FormBuilder from "./components/FormBuilder";
import AdminPanel from "./AdminPanel";

const App = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [formType, setFormType] = useState(""); // New state to store form type

  const handleFormUpdate = (updatedFields) => {
    setFields(updatedFields);
    setFormData(null); // Reset submitted data when form updates
    setShowForm(true); // Ensure form is visible after reset
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="flex space-x-8 w-3/4">
        <AdminPanel onFormUpdate={handleFormUpdate} setFormType={setFormType} />
        {showForm && (
          <FormBuilder
            fields={fields}
            formType={formType}
            onSubmit={setFormData}
            onReset={() => setFields([])}
          />
        )}
      </div>
    </div>
  );
};

export default App;
