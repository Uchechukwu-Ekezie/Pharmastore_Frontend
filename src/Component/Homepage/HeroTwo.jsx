import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaLock, FaGift, FaHeadset } from "react-icons/fa";

function HeroTwo() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      {/* Top Section */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        <div className="flex items-center justify-center p-4 bg-white rounded shadow">
          <FaShippingFast className="w-6 h-6 mr-2 text-teal-600" />
          <div>
            <h4 className="font-semibold">Free Shipping</h4>
            <p className="text-sm text-gray-500">Order Over $50000</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white rounded shadow">
          <FaLock className="w-6 h-6 mr-2 text-teal-600" />
          <div>
            <h4 className="font-semibold">Quick Payment</h4>
            <p className="text-sm text-gray-500">100% Secure</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white rounded shadow">
          <FaGift className="w-6 h-6 mr-2 text-teal-600" />
          <div>
            <h4 className="font-semibold">Big Cashback</h4>
            <p className="text-sm text-gray-500">Over 50% Cashback</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white rounded shadow">
          <FaHeadset className="w-6 h-6 mr-2 text-teal-600" />
          <div>
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-gray-500">Ready for You</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-4 mt-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative p-6 text-center shadow-2xl rounded-3xl bg-blue-50">
          <h3 className="mb-2 text-lg font-semibold">Prescription Medicines</h3>
          <p className="text-sm text-gray-500">
            Omologo Pharmacy has a vast range of specialist prescription medicines which require a physician’s prescription for order fulfillment.
          </p>
          <Link
            to="/store"
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
          >
            Shop Now
          </Link>
        </div>
        <div className="p-6 text-center shadow-2xl rounded-3xl bg-blue-50">
          <h3 className="mb-2 text-lg font-semibold">Over-The-Counter Medicines</h3>
          <p className="text-sm text-gray-500">
          From allergy and flu relief to dietary supplements, Matrix-36 Pharmacy has got you totally covered.
          </p>
          <Link
            to="/store"
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
          >
            Shop Now
          </Link>
        </div>
        <div className="relative p-6 text-center shadow-2xl rounded-3xl bg-blue-50">
          <h3 className="mb-2 text-lg font-semibold">Medical Devices</h3>
          <p className="text-sm text-gray-500">
          Your one-stop shop for all medical devices that you need to keep fit and in check. Visit the shop page now!
          </p>
          <Link
            to="/store"
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
          >
            Shop Now
          </Link>
        </div>
        <div className="relative p-6 text-center shadow-2xl rounded-3xl bg-blue-50">
          <h3 className="mb-2 text-lg font-semibold">First Aid</h3>
          <p className="text-sm text-gray-500">
            Discover a wide selection of first aid supplies for emergency and routine care, perfect for home, travel, or workplace.
          </p>
          <Link
            to="/store"
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroTwo;
