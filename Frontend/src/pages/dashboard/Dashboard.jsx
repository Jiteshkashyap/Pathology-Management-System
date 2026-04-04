import { useEffect, useState } from "react";
import { getAdminAnalytics } from "../../services/apiServices";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendar,
  FaRupeeSign,
} from "react-icons/fa";

const COLORS = ["#06b6d4", "#22c55e", "#ef4444"];

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdminAnalytics().then(setData).catch(console.log);
  }, []);

  if (!data)
    return (
      <p className="text-center mt-20 text-cyan-600 animate-pulse">
        Loading...
      </p>
    );

  const stats = [
    { title: "Total", value: data.stats.total, icon: <FaCalendar /> },
    { title: "Booked", value: data.stats.booked, icon: <FaUserMd /> },
    { title: "Completed", value: data.stats.completed, icon: <FaCheckCircle /> },
    { title: "Cancelled", value: data.stats.cancelled, icon: <FaTimesCircle /> },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue.toLocaleString()}`,
      icon: <FaRupeeSign />,
    },
  ];

  const chartData = [
    { name: "Booked", value: data.stats.booked },
    { name: "Completed", value: data.stats.completed },
    { name: "Cancelled", value: data.stats.cancelled },
  ];

  return (
    <div className="space-y-8">

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-5 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm 
            hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.value}
                </h2>
              </div>
              <div className="text-xl text-cyan-600">{item.icon}</div>
            </div>

            {/* subtle accent line */}
            <div className="mt-3 h-1 w-full bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
          </div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
          <h2 className="font-semibold mb-4 text-gray-700">
            Appointments Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                cursor={{ fill: "#ecfeff" }}
                contentStyle={{ borderRadius: "10px" }}
              />
              <Bar
                dataKey="value"
                fill="#06b6d4"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DONUT */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
  <h2 className="font-semibold mb-4 text-gray-700">
    Distribution
  </h2>

  <div className="flex items-center justify-between">

    <div className="relative">
      <ResponsiveContainer width={220} height={220}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold">{data.stats.total}</h2>
        <p className="text-xs text-gray-500">Total</p>
      </div>
    </div>

    {/* legend */}
    <div className="space-y-2">
      {chartData.map((item, i) => {
        const percent = ((item.value / data.stats.total) * 100).toFixed(0);
        return (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: COLORS[i] }}
            />
            <span className="text-gray-600">{item.name}</span>
            <span className="font-semibold">{percent}%</span>
          </div>
        );
      })}
    </div>

  </div>
</div>
      </div>

      {/* ================= POPULAR TESTS ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
  <h2 className="font-semibold mb-4 text-gray-700">
    Popular Tests
  </h2>

  {data.popularTests.map((test, i) => {
    const max = data.popularTests[0]?.count || 1;
    const percent = (test.count / max) * 100;

    return (
      <div key={i} className="mb-5">

        {/* header */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{i + 1}
            </span>
            <span className="text-gray-700 font-medium">
              {test.name}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-cyan-600">
              {test.count} bookings
            </p>
            <p className="text-xs text-gray-500">
              ₹{(test.revenue || 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* progress */}
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  })}
</div>

      {/* ================= PACKAGES ================= */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
  <h2 className="font-semibold mb-4 text-gray-700">
    Popular Packages
  </h2>

  {data.popularPackages?.map((pkg, i) => {
    const max = data.popularPackages[0]?.count || 1;
    const percent = (pkg.count / max) * 100;

    return (
      <div key={i} className="mb-5">

        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{i + 1}
            </span>
            <span className="text-gray-700 font-medium">
              {pkg.name}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-cyan-600">
              {pkg.count} bookings
            </p>
            <p className="text-xs text-gray-500">
              ₹{(pkg.revenue || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default Dashboard;