import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import VerticalCard from '../Component/VerticalCard';
import SummaryApi from '../common';

const SearchProduct = () => {
    const query = useLocation().search;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch products using a callback to ensure it doesn't change on every render
    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.searchProduct.url + query);
            const dataResponse = await response.json();
            setData(dataResponse.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [query]); // Include 'query' in the dependency array

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]); // Ensure fetchProduct is included here

    return (
        <div className='container p-4 mx-auto'>
            {loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )}

            <p className='my-3 text-lg font-semibold'>Search Results : {data.length}</p>

            {data.length === 0 && !loading && (
                <p className='p-4 text-lg text-center bg-white'>No Data Found....</p>
            )}

            {data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data} />
            )}
        </div>
    );
}

export default SearchProduct;
