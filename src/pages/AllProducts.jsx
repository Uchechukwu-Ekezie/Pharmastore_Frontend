import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UploadProducte from '../Component/UploadProducte'
import AdminProductCarde from '../Component/AdminProductCarde'


const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  
  return (
    <div>
        <div className='flex items-center justify-between px-4 py-2 bg-white'>
            <h2 className='text-lg font-bold'>All Product</h2>
            <button  className='px-3 py-1 text-teal-600 transition-all border-2 border-teal-600 rounded-full hover:bg-teal-600 hover:text-white ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        {/**all product */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCarde data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>





        {/* *upload prouct component */}
        {
          openUploadProduct && (
            <UploadProducte onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }
      

    </div>
  )
}

export default AllProducts