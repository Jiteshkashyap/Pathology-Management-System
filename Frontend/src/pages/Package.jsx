import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import PackageForm from "../forms/PackageForm";
import {
  getPackages,
  createPackages,
  updatePackages,
  deletePackages,
} from "../services/apiServices";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // ✅ Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await getPackages();
      setPackages(res.data); // adjust if needed (res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ✅ Create / Update
  const handleSubmit = async (data) => {
    try {
      if (selectedPackage) {
        await updatePackages(selectedPackage._id, data);
      } else {
        await createPackages(data);
      }

      fetchPackages(); // refresh list
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete
  const handleDelete = async () => {
    try {
      await deletePackages(selectedPackage._id);
      fetchPackages();
      setIsDeleteOpen(false);
    } catch (err) {
      console.log(err);
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
            <tr key={pkg._id || pkg.id} className="border-b">
              
              {/* Name */}
              <td className="py-3">{pkg.name}</td>

              {/* Tests */}
              <td className="text-sm">
                {pkg.testDetails?.length > 0
                  ? pkg.testDetails.map((t) => t.name).join(", ")
                  : "No tests"}
              </td>

              {/* Discount */}
              <td>{pkg.discountPercentage || pkg.discount}%</td>

              {/* Total Price */}
              <td>₹{pkg.totalPrice || 0}</td>

              {/* Final Price */}
              <td className="font-semibold text-green-600">
                ₹{pkg.discountedPrice || 0}
              </td>

              {/* Actions */}
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

      {/* Modal */}
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

      {/* Delete Modal */}
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