import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Adjust import based on your component structure
import SummaryApi from '../../common';

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch(SummaryApi.popularProduct.url, {
          method: SummaryApi.popularProduct.method,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Check the fetched data

        // Check if the data is an array
        if (Array.isArray(data) && data.length) {
          setPopularProducts(data); // Directly use the array of products
        } else {
          setError('Failed to fetch popular products');
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch popular products');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) return <p>Loading popular products...</p>;

  return (
    <div div className="flex flex-col items-center max-w-screen-xl px-8 py-12 mx-auto sm:px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold">Popular Products</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : popularProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No popular products available.</p>
      )}
    </div>
  );
};

export default PopularProducts;
