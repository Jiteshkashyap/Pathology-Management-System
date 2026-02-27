const Loader = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-400 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;