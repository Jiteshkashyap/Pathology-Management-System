import { useState, useEffect } from "react";

const DoctorForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        specialization: initialData.specialization || "",
        phone: initialData.phone || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      phone:String(form.phone)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      
      <div>
        <label className="text-sm text-gray-600">Doctor Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter doctor name"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      
      <div>
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

     
      <div>
        <label className="text-sm text-gray-600">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="Enter specialization"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

    
      <div>
        <label className="text-sm text-gray-600">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      
      <div className="flex justify-end gap-3 pt-4 border-t">

        <button
          type="button"
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Doctor
        </button>

      </div>

    </form>
  );
};

export default DoctorForm;