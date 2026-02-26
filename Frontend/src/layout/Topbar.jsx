const Topbar = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500">
          Diagnostic Center Management
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">Admin</p>
          <p className="text-xs text-gray-400">admin@lab.com</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  );
};

export default Topbar;