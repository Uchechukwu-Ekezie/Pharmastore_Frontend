// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SummaryApi from '../common';

// const ProfileUpdateForm = ({ userId }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     profilePhoto: null,
//   });

//   // Fetch user profile on component mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch(SummaryApi.current_user.url, {
//           method: SummaryApi.current_user.method,
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setFormData({
//           fullName: data.fullName || '',
//           email: data.email || '',
//           phoneNumber: data.phoneNumber || '',
//           address: data.address || '',
//           profilePhoto: null,
//         });
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchUserProfile();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePhotoChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePhoto: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await updateUserProfile(userId, formData);
//       alert('Profile updated successfully!');
//       // Handle success (e.g., redirect or refresh profile data)
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile. Please try again.');
//     }
//   };

//   const updateUserProfile = async (userId, profileData) => {
//     try {
//       const formDataToSubmit = new FormData();
//       Object.keys(profileData).forEach(key => {
//         if (profileData[key]) formDataToSubmit.append(key, profileData[key]);
//       });

//       const response = await axios.put(SummaryApi.updateUserProfile.url, formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       throw error;
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
//         <form className="w-full max-w-md" onSubmit={handleSubmit}>
//           {/* Logo Section */}
//           <div className="flex justify-center mx-auto">
//             <img
//               className="w-auto h-7 sm:h-8"
//               src="https://merakiui.com/images/logo.svg"
//               alt="Logo"
//             />
//           </div>

//           {/* Profile Update Heading */}
//           <div className="flex items-center justify-center mt-6">
//             <h2 className="w-full pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-teal-600">
//               Update Profile
//             </h2>
//           </div>

//           {/* Full Name Input */}
//           <div className="relative flex items-center mt-8">
//             <span className="absolute">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6 mx-3 text-gray-700"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             </span>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-teal-700 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
//               placeholder="Full Name"
//             />
//           </div>

//           {/* Profile Photo Upload */}
//           <label
//             htmlFor="dropzone-file"
//             className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>

//             <h2 className="mx-3 text-gray-700">Update Profile Photo</h2>

//             <input
//               id="dropzone-file"
//               type="file"
//               onChange={handlePhotoChange}
//               className="hidden"
//             />
//           </label>

//           {/* Email Address Input */}
//           <div className="relative flex items-center mt-6">
//             <span className="absolute">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6 mx-3 text-gray-700"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 />
//               </svg>
//             </span>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-teal-700 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
//               placeholder="Email Address"
//             />
//           </div>

//           {/* Phone Number Input */}
//           <div className="relative flex items-center mt-4">
//             <span className="absolute">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 10h1m0 0v11m0-11H4m13-6h-3a2 2 0 00-2 2v1a2 2 0 002 2h3a2 2 0 002-2V6a2 2 0 00-2-2zM3 7v.01M3 13v.01M3 17v.01M3 21v.01M9 5v.01M15 5v.01M21 5v.01"
//                 />
//               </svg>
//             </span>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-teal-700 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
//               placeholder="Phone Number"
//             />
//           </div>

//           {/* Address Input */}
//           <div className="relative flex items-center mt-4">
//             <span className="absolute">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 10l1-1m1-1h1m1 0h8a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v8H4a2 2 0 00-1 3.72V16m14-6v.01M21 13h.01M12 20l-1.5 1.5m0 0L9 20m1.5 1.5v.01M9 21h1m1-4h2m1-5H9v1m0 2h1m2-3v1m0 4v1m4-5H9v1m2 4h.01M9 12h.01M9 10h.01M3 20h18"
//                 />
//               </svg>
//             </span>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-teal-700 focus:ring-teal-600 focus:outline-none focus:ring focus:ring-opacity-40"
//               placeholder="Address"
//             />
//           </div>

//           {/* Update Profile Button */}
//           <button
//             type="submit"
//             className="w-full px-6 py-3 mt-8 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ProfileUpdateForm;
