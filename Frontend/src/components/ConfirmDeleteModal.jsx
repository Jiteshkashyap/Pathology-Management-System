const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6">

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Delete Confirmation
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-medium">{itemName}</span>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteModal;