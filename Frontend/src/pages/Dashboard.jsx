const stats = [
  { title: "Total Doctors", value: 12 },
  { title: "Total Tests", value: 25 },
  { title: "Total Packages", value: 6 },
  { title: "Reports Today", value: 8 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-gray-500 text-sm">{item.title}</h2>
            <p className="text-3xl font-bold mt-3 text-gray-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-500 text-sm">
          Latest reports and system updates will appear here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;