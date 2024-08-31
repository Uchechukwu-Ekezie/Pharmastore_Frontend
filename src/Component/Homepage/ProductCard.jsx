import React from "react";
import displayINRCurrency from "../../helpers/displayCurrency";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="relative max-w-xs p-4 transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 min-h-[400px] ">
      {/* Discount Badge */}
      <span className="absolute px-6 py-4 font-medium tracking-widest text-white uppercase bg-teal-600 -right-px -top-px rounded-bl-3xl rounded-tr-3xl">
        Save 15%
      </span>

      {/* Product Image */}
      <div className="flex items-center justify-center h-40 mb-4 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.productImage[0]} // Assuming productImage is an array
          alt={product.productName}
          className="object-contain w-full h-full"
        />
      </div>
      

      {/* Product Details */}
      <div className="flex flex-col items-start space-y-2">
        <h5 className="">{product.category}</h5>
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900">
          {product.productName}
        </h3>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xl font-semibold text-teal-600">
          {displayINRCurrency(product.sellingPrice)}
        </p>
      </div>

      {/* Buy Button */}
      <button className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white transition-colors duration-200 bg-teal-600 rounded-lg hover:bg-teal-700">
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
