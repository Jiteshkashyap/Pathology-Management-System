
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({ item, type }) => {
  const navigate = useNavigate();
  const isPackage = type === "package";

  const savings = isPackage
    ? (item.totalPrice - item.discountedPrice).toFixed(0)
    : 0;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 border relative flex flex-col justify-between h-full">

      {/* 🔥 Discount Badge */}
      {isPackage && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md"
        >
          {item.discountPercentage}% OFF
        </motion.span>
      )}

      {/* 🔥 Popular Tag */}
      {isPackage && item.discountPercentage >= 20 && (
        <span className="absolute  top-4 left-90 bg-yellow-400 text-xs px-2 py-1 rounded-full font-semibold shadow">
          🔥 Popular
        </span>
      )}

      {/* TOP CONTENT */}
      <div>
        {/* Title */}
        
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {item.name}
        </h3>
        

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4">
          {isPackage
            ? `${item.testDetails?.length} tests included`
            : item.category}
        </p>

        {/* Test List */}
        <ul className="space-y-2 text-sm text-gray-600 mb-4">
          {isPackage &&
            item.testDetails?.slice(0, 3).map((t) => (
              <li key={t._id} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-cyan-600" />
                {t.name}
              </li>
            ))}

          {/* + more tests */}
          {isPackage && item.testDetails?.length > 3 && (
            <p className="text-xs text-gray-400 ml-6">
              +{item.testDetails.length - 3} more tests
            </p>
          )}

          {/* Single test */}
          {type === "test" && (
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan-600" />
              Normal Range: {item.normalRange?.min} - {item.normalRange?.max}
            </li>
          )}
        </ul>
      </div>

      {/* BOTTOM CONTENT */}
      <div>
        {/* 💰 PRICE SECTION */}
        <div className="mb-4">
          {isPackage ? (
            <>
              <p className="text-gray-400 line-through text-sm">
                ₹{item.totalPrice}
              </p>

              <p className="text-2xl font-bold text-cyan-700">
                ₹{item.discountedPrice.toFixed(0)}
              </p>

              <p className="text-xs text-green-600 font-medium">
                You save ₹{savings}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold text-cyan-700">
              ₹{item.price}
            </p>
          )}
        </div>

        {/* 🚀 BUTTON */}
        <button
          onClick={() => navigate("/appointment")}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-2 rounded-lg text-sm hover:from-cyan-700 hover:to-cyan-600 transition-all duration-300 shadow-sm"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;