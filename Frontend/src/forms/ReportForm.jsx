import { useEffect, useState } from "react";

const ReportForm = ({
  mode = "create",
  initialData = null,
  doctors = [],
  tests = [],
  onSubmit,
}) => {
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientAge: "",
    doctor: "",
    selectedTests: [],
    results: {},
  });

  

  useEffect(() => {
    if (mode === "update" && initialData) {
      setForm({
        patientName: initialData.patientName || "",
        patientEmail: initialData.patientEmail || "",
        patientAge: initialData.patientAge || "",
        doctor: initialData.doctor?._id || "",
        selectedTests:
          initialData.tests?.map((t) => t.test?._id) || [],
        results:
          initialData.tests?.reduce((acc, t) => {
            acc[t.test?._id] = t.result || "";
            return acc;
          }, {}) || {},
      });
    }
  }, [initialData, mode]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleTestSelect = (testId) => {
    const updated = form.selectedTests.includes(testId)
      ? form.selectedTests.filter((id) => id !== testId)
      : [...form.selectedTests, testId];

    setForm({ ...form, selectedTests: updated });
  };


  const handleResultChange = (testId, value) => {
    setForm({
      ...form,
      results: {
        ...form.results,
        [testId]: value,
      },
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "create") {
  const payload = {
    patientName: form.patientName,
    patientEmail: form.patientEmail,
    patientAge: Number(form.patientAge),
    doctor: form.doctor,
    tests: form.selectedTests,  
  };

  onSubmit(payload);
}else {
      const payload = {
        results: form.selectedTests.map((id) => ({
          testId: id,
          result: Number(form.results[id]),
        })),
      };

      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      
      {mode === "create" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              placeholder="Patient Name"
              className="border px-4 py-2 rounded"
              required
            />

            <input
              type="email"
              name="patientEmail"
              value={form.patientEmail}
              onChange={handleChange}
              placeholder="Patient Email"
              className="border px-4 py-2 rounded"
              required
            />

            <input
              type="number"
              name="patientAge"
              value={form.patientAge}
              onChange={handleChange}
              placeholder="Patient Age"
              className="border px-4 py-2 rounded"
              required
            />

            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="border px-4 py-2 rounded"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="text-sm font-medium">
              Select Tests
            </label>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {tests.map((test) => (
                <label key={test._id} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={form.selectedTests.includes(
                      test._id
                    )}
                    onChange={() =>
                      handleTestSelect(test._id)
                    }
                  />
                  {test.name}
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {mode === "update" && (
        <div className="space-y-4">
          <h3 className="font-semibold">
            Enter Test Results
          </h3>

          {form.selectedTests.map((testId) => {
            const test = tests.find(
              (t) => t._id === testId
            );

            return (
              <div key={testId}>
                <label className="text-sm">
                  {test?.name}
                </label>

                <input
                  type="number"
                  value={form.results[testId] || ""}
                  onChange={(e) =>
                    handleResultChange(
                      testId,
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
            );
          })}
        </div>
      )}

    
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          {mode === "create"
            ? "Create Report"
            : "Update Results"}
        </button>
      </div>
    </form>
  );
};

export default ReportForm;