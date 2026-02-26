import { useState, useEffect } from "react";

const TestForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    min: "",
    max: "",
    price: "",
    isActive: true,
  });

  

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        unit: initialData.unit || "",
        min: initialData.normalRange?.min || "",
        max: initialData.normalRange?.max || "",
        price: initialData.price || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      name: form.name,
      category: form.category,
      unit: form.unit,
      normalRange: {
        min: Number(form.min),
        max: Number(form.max),
      },
      price: Number(form.price),
    };

    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

     
      <div>
        <label className="text-sm text-gray-600">Test Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

     
      <div>
        <label className="text-sm text-gray-600">Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g. Blood, Urine, Hormone"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

     
      <div>
        <label className="text-sm text-gray-600">Unit</label>
        <input
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="e.g. mg/dL"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

     
      <div>
        <label className="text-sm text-gray-600">Normal Range</label>
        <div className="flex gap-3 mt-1">
          <input
            type="number"
            name="min"
            value={form.min}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <input
            type="number"
            name="max"
            value={form.max}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      
      <div>
        <label className="text-sm text-gray-600">Price (₹)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Test
        </button>
      </div>

    </form>
  );
};

export default TestForm;