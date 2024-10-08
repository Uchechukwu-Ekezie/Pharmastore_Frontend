import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }




    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])




  return (
    <div className='container relative px-4 mx-auto my-6'>

            <h2 className='py-4 text-2xl font-semibold'>{heading}</h2>

                
           <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='grid gap-3 p-4'>
                                    <h2 className='p-1 py-2 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 animate-pulse bg-slate-200'></h2>
                                    <p className='p-1 py-2 capitalize rounded-full text-slate-500 animate-pulse bg-slate-200'></p>
                                    <div className='flex gap-3'>
                                        <p className='w-full p-1 py-2 font-medium text-red-600 rounded-full animate-pulse bg-slate-200'></p>
                                        <p className='w-full p-1 py-2 line-through rounded-full text-slate-500 animate-pulse bg-slate-200'></p>
                                    </div>
                                    <button className='px-3 py-2 text-sm text-white rounded-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link to={"/store/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply'/>
                                </div>
                                <div className='grid gap-3 p-4'>
                                    <h2 className='text-base font-medium text-black md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='font-medium text-teal-600'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                        <p className='line-through text-slate-500'>{ displayINRCurrency(product?.price)  }</p>
                                    </div>
                                    <button className='text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default CategroyWiseProductDisplay