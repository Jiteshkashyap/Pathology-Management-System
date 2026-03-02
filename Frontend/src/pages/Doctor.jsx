import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/apiServices.js";

import {
  setDoctors,
  addDoctorState,
  updateDoctorState,
  deleteDoctorState,
  setDoctorLoading,
  setDoctorError,
  setPage,
  setPagination
} from "../redux/doctorSlice";

import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import DoctorForm from "../forms/DoctorForm";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination.jsx";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error, page,totalPages} = useSelector(
    (state) => state.doctors
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [limit]= useState(5)
  const [specialization ,setSpecialization]=useState('')
  const [debouncedSpecialization, setDebouncedSpecialization] = useState("");
  

  const fetchAllDoctors = async () => {
  try {
    dispatch(setDoctorLoading(true));

    const data = await getDoctors({
      page,
      limit,
      specialization: debouncedSpecialization,
    });

    dispatch(setDoctors(data.data));
    dispatch(
    setPagination({
    page: data.page,
    totalPages: data.totalPages,
  })
);

  } catch (err) {
    dispatch(
      setDoctorError(
        err.response?.data?.message || "Failed to fetch doctors"
      )
    );
  }
};

  useEffect(() => {
   

    fetchAllDoctors();
  }, [dispatch,page,debouncedSpecialization]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSpecialization(specialization);
  }, 500); 

  return () => clearTimeout(timer);
}, [specialization]);
  

const handleSubmit = async (formData) => {
  const loadingToast = toast.loading(selectedDoctor ?'Updating doctor...': "Creating doctor...")
  try {
    dispatch(setDoctorLoading(true));

    if (selectedDoctor) {
      const response = await updateDoctor(
        selectedDoctor._id,
        formData
      );

      dispatch(updateDoctorState(response.data));
      toast.success("Doctor updated successfully");

    } else {
      const response = await createDoctor(formData);
      dispatch(addDoctorState(response.data));
      toast.success("Doctor created successfully");
    }

    
    setIsModalOpen(false);
    setSelectedDoctor(null);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Operation failed"
    );
  }
  finally{
    dispatch(setDoctorLoading(false))
    toast.dismiss(loadingToast)
  }
};

 

  const confirmDelete = async () => {
    const loadingToast =toast.loading("Deleting")
    try {
      dispatch(setDoctorLoading(true))
      await deleteDoctor(selectedDoctor._id);
      dispatch(deleteDoctorState(selectedDoctor._id));
      setIsDeleteOpen(false);
      toast.success("Doctor delted Succesfully")
    } catch (err) {
      dispatch(
        setDoctorError(
          err.response?.data?.message || "Delete failed"
        )
      );
      toast.error(err.response?.data?.message ||"Delete failed")
    } finally{
      dispatch(setDoctorLoading(false));
      toast.dismiss(loadingToast)
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Doctor Management
        </h2>

        <button
          onClick={() => {
            setSelectedDoctor(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Doctor
        </button>
      </div>

      <select
  value={specialization}
  onChange={(e) => {
    setSpecialization(e.target.value);
    setPage(1);
  }}
  className="border px-3 py-2 rounded-lg mb-4"
>
  <option value="">All Specializations</option>
  <option value="Cardiologist">Cardiologist</option>
  <option value="Neurologist">Neurologist</option>
  <option value="Dermatologist">Dermatologist</option>
</select>
{loading ? (
  <Loader/>
):(
     <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
    <tr className="border-b bg-gray-50 text-sm text-gray-600">
      <th className="py-3 px-2">Name</th>
      <th className="px-2">Email</th>
      <th className="px-2">Specialization</th>
      <th className="px-2">Mobile No</th>
      <th className="px-2 text-right">Actions</th>
    </tr>
  </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id} className="border-b">
              <td className="py-3">{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.specialization}</td>
              <td>{doc.phone}</td>
              <td className="text-right space-x-3">
                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
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
      </div>
)}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDoctor ? "Update Doctor" : "Create Doctor"}
      >
        <DoctorForm
          initialData={selectedDoctor}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedDoctor?.name}
      />

      <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={(p)=>dispatch(setPage(p))}
/>

    </div>
  );
};

export default Doctors;