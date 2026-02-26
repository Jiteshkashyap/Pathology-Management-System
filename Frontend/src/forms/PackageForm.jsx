import { useState, useEffect } from "react";
import { getTests } from "../services/apiServices";

const PackageForm = ({ initialData, onSubmit }) => {
  const [testsData, setTestsData] = useState([]);

  const [form, setForm] = useState({
    name: "",
    discount: "",
    selectedTests: [],
  });

 
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getTests();
        setTestsData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTests();
  }, []);

  
  useEffect(() => {
    const safeData = initialData || {};

    setForm({
      name: safeData.name || "",
      discount: safeData.discountPercentage || "",
      selectedTests: safeData.tests
        ? safeData.tests.map((t) =>
            typeof t === "object" ? t._id : t
          )
        : [],
    });
  }, [initialData]);

  
  const handleCheckbox = (testId) => {
    if (form.selectedTests.includes(testId)) {
      setForm({
        ...form,
        selectedTests: form.selectedTests.filter((id) => id !== testId),
      });
    } else {
      setForm({
        ...form,
        selectedTests: [...form.selectedTests, testId],
      });
    }
  };

  
  const totalPrice = testsData
    .filter((t) => form.selectedTests.includes(t._id))
    .reduce((sum, t) => sum + t.price, 0);

  const discountedPrice =
    totalPrice -
    (totalPrice * Number(form.discount || 0)) / 100;

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      tests: form.selectedTests,
      discountPercentage: Number(form.discount),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      
      <div>
        <label className="text-sm text-gray-600">Package Name</label>
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
      <div>
        <label className="text-sm text-gray-600">Select Tests</label>

        <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
          {testsData.map((test) => (
            <div key={test._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.selectedTests.includes(test._id)}
                onChange={() => handleCheckbox(test._id)}
              />
              <span className="text-sm">
                {test.name} (₹{test.price})
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Selected: {form.selectedTests.length}
        </p>
      </div>

    
      <div>
        <label className="text-sm text-gray-600">Discount (%)</label>
        <input
          type="number"
          value={form.discount}
          onChange={(e) =>
            setForm({ ...form, discount: e.target.value })
          }
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
      <div className="bg-gray-100 p-3 rounded-lg text-sm">
        <p>Total Price: ₹{totalPrice}</p>
        <p className="text-green-600 font-semibold">
          Discounted Price: ₹{discountedPrice}
        </p>
      </div>

      
      <div className="flex justify-end pt-4">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Save Package
        </button>
      </div>

    </form>
  );
};

export default PackageForm;