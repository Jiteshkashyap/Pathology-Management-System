import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import PackageForm from "../forms/PackageForm";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

import {
  getPackages,
  createPackages,
  updatePackages,
  deletePackages,
} from "../services/apiServices";

import {
  setPackages,
  addPackageState,
  updatePackageState,
  deletepackageState,
  setPackageLoading,
  setPackageError,
} from "../redux/packageSlice";

const Packages = () => {
  const dispatch = useDispatch();
  const { packages, loading } = useSelector((state) => state.packages);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        dispatch(setPackageLoading(true));

        const res = await getPackages();

        dispatch(setPackages(res.data));
      } catch (err) {
        dispatch(setPackageError(err.response?.data?.message || "Failed to fetch packages"));
       toast.error(err.response?.data?.message || "Failed to fetch packages");
      }
    };

    fetchPackages();
  }, [dispatch]);

  

  const handleSubmit = async (data) => {
    const loadingToast = toast.loading(selectedPackage ? "Updating package..." : "Creating package...");

    try {
      dispatch(setPackageLoading(true));

      if (selectedPackage) {
        const response = await updatePackages(selectedPackage._id, data);
        dispatch(updatePackageState(response.data.data));
        toast.success("Package updated successfully");
      } else {
        const response = await createPackages(data);

        dispatch(addPackageState(response.data.data));
        toast.success("Package created successfully");
      }

      setIsModalOpen(false);
      setSelectedPackage(null);

    } catch (err) {
      dispatch(setPackageError(err.response?.data?.message || "Operation failed"));

      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      dispatch(setPackageLoading(false));
      toast.dismiss(loadingToast);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    const loadingToast = toast.loading("Deleting package...");

    try {
      dispatch(setPackageLoading(true));

      await deletePackages(selectedPackage._id);

      dispatch(deletepackageState(selectedPackage._id));

      toast.success("Package deleted successfully");

      setIsDeleteOpen(false);

    } catch (err) {
      dispatch(
        setPackageError(
          err.response?.data?.message || "Delete failed"
        )
      );

      toast.error(
        err.response?.data?.message || "Delete failed"
      );
    } finally {
      dispatch(setPackageLoading(false));
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Package Management
        </h2>

        <button
          onClick={() => {
            setSelectedPackage(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Package
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-600">
              <th className="py-2">Name</th>
              <th>Tests</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Final Price</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id} className="border-b">
                <td className="py-3">{pkg.name}</td>

                <td className="text-sm">
                  {pkg.testDetails?.length > 0
                    ? pkg.testDetails.map((t) => t.name).join(", ")
                    : "No tests"}
                </td>

                <td>{pkg.discountPercentage}%</td>
                <td>₹{pkg.totalPrice || 0}</td>

                <td className="font-semibold text-green-600">
                  ₹{pkg.discountedPrice || 0}
                </td>

                <td className="text-right space-x-3">
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
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
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPackage ? "Update Package" : "Create Package"}
      >
        <PackageForm
          initialData={selectedPackage}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedPackage?.name}
      />
    </div>
  );
};

export default Packages;