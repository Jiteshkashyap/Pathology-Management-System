import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import TestForm from "../forms/TestForm";
import { useDispatch,useSelector } from "react-redux";

import { 
  setTestLoading,
  setTestError,
  setTests,
  updateTestState,
  addTestState,
  deleteTestState
 } from "../redux/testSlice";

import { 
  getTests,
 createTests,
 deleteTests,
 updateTests
} from "../services/apiServices";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Tests = () => {
  const dispatch = useDispatch()
  const {tests ,loading ,error}=useSelector((state)=> state.tests)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(()=>{
  const fetchAllTests = async()=>{
    try {
      dispatch(setTestLoading(true))
      const data =await getTests();
      dispatch(setTests(data.data))
    } catch (err) {
      dispatch(
        setTestError(
          err.response?.data?.message || "Fialed to fetch tests"
        )
      )
    }
  }
  fetchAllTests();
  },[dispatch])
   

  const handleSubmit = async (formData) => {
  const loadingToast = toast.loading(
    selectedTest ? "Updating test..." : "Creating test..."
  );

  try {
    dispatch(setTestLoading(true))
    if (selectedTest) {
      const response = await updateTests(
        selectedTest._id,
        formData
      );
      dispatch(updateTestState(response.data));
      toast.success("Test updated successfully");
    } else {
      const response = await createTests(formData);
      dispatch(addTestState(response.data));
      toast.success("Test created successfully");
    }

    setIsModalOpen(false);
    setSelectedTest(null);
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Operation failed"
    );
  } finally {
    dispatch(setTestLoading(false))
    toast.dismiss(loadingToast);
  }
};

const confirmDelete = async () => {
  const loadingToast = toast.loading("Deleting test...");

  try {
    dispatch(setTestLoading(true))

    await deleteTests(selectedTest._id);

    dispatch(deleteTestState(selectedTest._id));

    toast.success("Test deleted successfully");
    setIsDeleteOpen(false);
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Delete failed"
    );
  } finally {
    dispatch(setTestLoading(false))
    toast.dismiss(loadingToast);
  }
};
   

 

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Test Management</h2>

        <button
          onClick={() => {
            setSelectedTest(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Test
        </button>
      </div>
    {loading ? (
      <Loader/>
    ):(
      <table className="w-full text-left border-collapse">
  <thead>
    <tr className="border-b bg-gray-50 text-sm text-gray-600">
      <th className="py-3 px-2">Name</th>
      <th className="px-2">Category</th>
      <th className="px-2">Unit</th>
      <th className="px-2">Normal Range</th>
      <th className="px-2">Price (₹)</th>
      <th className="px-2">Status</th>
      <th className="px-2 text-right">Actions</th>
    </tr>
  </thead>

  <tbody>
    {tests.map((test) => (
      <tr key={test._id} className="border-b hover:bg-gray-50 text-sm">
        <td className="py-3 px-2">{test.name}</td>
        <td className="px-2">{test.category}</td>
        <td className="px-2">{test.unit}</td>
        <td className="px-2">
          {test.normalRange?.min} - {test.normalRange?.max}
        </td>
        <td className="px-2">₹{test.price}</td>
        <td className="px-2">
          {test.isActive ? (
            <span className="text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-red-600 font-medium">Inactive</span>
          )}
        </td>
        <td className="px-2 text-right space-x-3">
          <button
            onClick={() => {
              setSelectedTest(test);
              setIsModalOpen(true);
            }}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setSelectedTest(test);
              setIsDeleteOpen(true);
            }}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
       </table>
    )
}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTest ? "Update Test" : "Create Test"}
      >
        <TestForm
          initialData={selectedTest}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedTest?.name}
      />
    </div>
  );
};

export default Tests;