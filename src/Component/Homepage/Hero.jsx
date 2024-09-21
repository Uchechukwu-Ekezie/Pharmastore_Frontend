import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="flex flex-col items-center justify-between lg:flex-row">
      <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0">
        <div className="max-w-xl mb-6">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Welcome To Self Med Hub
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          Your Trusted <span className='text-teal-600'>Online Pharmacy</span>
            <br className="hidden md:block" />
            for{' '}
            <span className="inline-block text-deep-purple-accent-400">
            Health and Wellness
            </span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
          Discover a wide range of medications, supplements, and healthcare products. We provide quality, affordable products with fast delivery to your doorstep.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <Link
            to="/store"
            className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-semibold tracking-wide text-black transition duration-200 bg-teal-600 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          >
            <span className="mr-3">Shop Now</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4"
            >
              <polyline
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                points="4,4 22,4 19,14 4,14 "
              />
              <circle
                cx="4"
                cy="22"
                r="2"
                strokeLinejoin="miter"
                strokeLinecap="square"
                stroke="none"
                fill="currentColor"
              />
              <circle
                cx="20"
                cy="22"
                r="2"
                strokeLinejoin="miter"
                strokeLinecap="square"
                stroke="none"
                fill="currentColor"
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                points="1,1 4,4 4,14 2,18 23,18 "
              />
            </svg>
          </Link>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
          >
            Get 15% off on your first order
          </a>
        </div>
      </div>
      <div className="relative lg:w-1/2">
        <img
          className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
          src="https://media.istockphoto.com/id/1603361100/photo/portrait-of-black-woman-in-pharmacy-with-tablet-smile-and-online-inventory-list-for-medicine.webp?a=1&b=1&s=612x612&w=0&k=20&c=fHv_zJ1vgyt3PB3gK9Xqr1bBxqMmqRxtZjEuRBC2yRc="
          alt=""
        />
       
        
        
      </div>
    </div>
  </div>
  )
}

export default Hero