import { useState, useEffect } from "react";

const DoctorForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    phone: "",
    experience: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        specialization: initialData.specialization || "",
        phone: initialData.phone || "",
        experience: initialData.experience || "",
        description: initialData.description || "",
        image: null, // don't prefill file
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    onSubmit(formData); // ✅ IMPORTANT
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

  <div className="grid grid-cols-2 gap-4">

    {/* NAME */}
    <div className="col-span-2">
      <label className="text-sm text-gray-600">Doctor Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
        required
      />
    </div>

    {/* EMAIL */}
    <div>
      <label className="text-sm text-gray-600">Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
        required
      />
    </div>

    {/* PHONE */}
    <div>
      <label className="text-sm text-gray-600">Phone</label>
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
        required
      />
    </div>

    {/* SPECIALIZATION */}
    <div>
      <label className="text-sm text-gray-600">Specialization</label>
      <input
        type="text"
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
        required
      />
    </div>

    {/* EXPERIENCE */}
    <div>
      <label className="text-sm text-gray-600">Experience</label>
      <input
        type="text"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
      />
    </div>

    {/* DESCRIPTION */}
    <div className="col-span-2">
      <label className="text-sm text-gray-600">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg"
        rows="3"
      />
    </div>

    {/* IMAGE */}
    <div className="col-span-2">
      <label className="text-sm text-gray-600">Doctor Image</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full mt-1"
      />
    </div>

  </div>

  {/* ACTIONS */}
  <div className="flex justify-end gap-3 pt-3 border-t">
    <button
      type="button"
      className="px-4 py-2 border rounded-lg"
      onClick={() => window.history.back()}
    >
      Cancel
    </button>

    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg"
    >
      Save Doctor
    </button>
  </div>

</form>
  );
};

export default DoctorForm;