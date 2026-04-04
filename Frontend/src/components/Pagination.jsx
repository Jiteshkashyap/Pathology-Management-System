const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t">
      
      {/* Info */}
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Pages */}
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 text-sm rounded-md border ${
                page === p
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Pagination;