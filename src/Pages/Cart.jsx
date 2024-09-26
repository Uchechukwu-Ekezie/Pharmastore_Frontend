import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
  const [isFirstAidCategorySelected, setIsFirstAidCategorySelected] =
    useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [showChatForm, setShowChatForm] = useState(false); // Chat form visibility
  const [patientResponse, setPatientResponse] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [isAmitriptyline, setIsAmitriptyline] = useState(false);

  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const [questionAnswer, setQuestionAnswer] = useState("");

  // Fetch Cart Data
  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });



    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
      // Check for specific categories
      setIsPrescriptionRequired(
        responseData.data.some(
          (product) => product?.productId?.category === "pres_med"
        )
      );
      setIsFirstAidCategorySelected(
        responseData.data.some(
          (product) => product?.productId?.category === "first_aid"
        )
      );
      const amitriptylinePresent = responseData.data.some(
        (product) =>
          product?.productId?.productName.toLowerCase() === "teva amitriptyline 50mg x28"
      );
      setIsAmitriptyline(amitriptylinePresent);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const fetchUserEmail = async () =>{
    const responsed = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : "include",
      headers : {
        "content-type" : "application/json"
      }
    })
    const data = await responsed.json()
    console.log("data",data)
  }

  console.log("data",fetchUserEmail)

  const handleChatWithDoctor = async () => {
    setShowChatForm(true);
  };

  const sendInquiry = async () => {
    const senderEmail = context.user?.email; // Assuming user's email is stored in context
  
    if (patientResponse.q1.trim() || patientResponse.q2.trim() || patientResponse.q3.trim() || patientResponse.q4.trim()) {
      try {
        await axios.post("/api/send-email", {
          subject: "Patient Inquiry",
          body: `Patient's Response: 
            1. ${patientResponse.q1}
            2. ${patientResponse.q2}
            3. ${patientResponse.q3}
            4. ${patientResponse.q4}`,
          senderEmail: senderEmail, // Include sender's email in the request
        });
  
        toast("Your inquiry has been sent to the doctor.");
        setShowChatForm(false); // Close modal after submitting
        setPatientResponse({ q1: "", q2: "", q3: "", q4: "" }); // Clear input fields
      } catch (error) {
        toast("There was an error sending your inquiry. Please try again later.");
      }
    } else {
      toast("Please provide a response before submitting.");
    }
  };

  // Increase Quantity of Product
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  // Decrease Quantity of Product
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  // Delete Product from Cart
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    setShowModal(true); // Show modal before proceeding
  };

  // Handle Prescription Upload
  const handlePrescriptionUpload = (event) => {
    setPrescriptionFile(event.target.files[0]);
  };

  // Proceed to Payment after Confirming the Modal
  const proceedToPayment = async () => {
    if (isPrescriptionRequired && !prescriptionFile) {
      alert("Please upload a prescription to proceed.");
      return;
    }

    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });
    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
    setShowModal(false); // Hide modal after confirming
  };

  // Calculate Total Quantity and Price
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="my-3 text-lg text-center">
          {data.length === 0 && !loading && (
            <p className="py-5 bg-white">No Product</p>
          )}
        </div>
        <div className="flex flex-col gap-10 p-4 lg:flex-row lg:justify-between">
          <div className="w-full max-w-3xl">
            {loading
              ? loadingCart?.map((el, index) => (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full h-32 my-2 border rounded bg-slate-200 border-slate-300 animate-pulse"
                  ></div>
                ))
              : data.map((product, index) => (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="object-scale-down w-full h-full mix-blend-multiply"
                        alt="product"
                      />
                    </div>
                    <div className="relative px-4 py-2">
                      <div
                        className="absolute right-0 p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-600 hover:text-white"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-red-600">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-lg font-semibold text-slate-600">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="flex items-center justify-center w-6 h-6 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="flex items-center justify-center w-6 h-6 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {data[0] && (
            <div className="w-full max-w-sm mt-5 lg:mt-0">
              {loading ? (
                <div className="border h-36 bg-slate-200 border-slate-300 animate-pulse"></div>
              ) : (
                <div className="bg-white h-36">
                  <h2 className="px-4 py-2 text-lg font-bold text-slate-700">
                    Cart Summary
                  </h2>
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <div className="flex justify-between">
                      <p className="text-slate-500">Total Items:</p>
                      <p>{totalQty}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-500">Total Price:</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>
                    <button
                      className="w-full px-4 py-2 mt-3 text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={handlePayment}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal for Confirmation */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-5 bg-white rounded w-96">
              <h2 className="mb-4 text-xl font-bold text-center">
                Confirm Purchase
              </h2>
              {isPrescriptionRequired && (
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-700">
                    We noticed you selected a drug from the prescription
                    medication category. Please upload a doctor's prescription
                    or chat with a doctor.
                  </p>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Doctor’s Prescription
                  </label>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={handlePrescriptionUpload}
                    className="block w-full p-2 mt-1 text-sm border rounded"
                  />
                  <div className="flex justify-between mt-3">
                    <button
                      className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                      onClick={handleChatWithDoctor}
                    >
                      Chat with a Doctor
                    </button>
                  </div>
                </div>
              )}

              <>
                {isFirstAidCategorySelected && (
                  <div className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      First Aid Measures
                    </h3>
                    <p className="text-sm text-gray-700">
                      For first aid products, please ensure you follow these
                      basic measures:
                      <ul className="ml-5 list-disc">
                        <li>
                          Clean the affected area with mild soap and water.
                        </li>
                        <li>
                          Apply the appropriate first aid treatment as
                          recommended.
                        </li>
                        <li>
                          Seek medical attention if symptoms persist or worsen.
                        </li>
                      </ul>
                    </p>
                  </div>
                )}

                <ul className="mb-4">
                  {data.map((product, index) => (
                    <li key={index}>{product?.productId?.productName}</li>
                  ))}
                </ul>
              </>

              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  onClick={proceedToPayment}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Form Modal */}
        {showChatForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 max-w-4xl p-5 bg-white rounded">
              <h2 className="mb-4 text-xl font-bold text-center">
                Chat with a Doctor
              </h2>
              <div className="flex flex-col gap-6">
                {/* Question 1 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    1. What is the name of the medication you are currently
                    taking?
                  </label>
                  <textarea
                    value={patientResponse.q1}
                    onChange={(e) =>
                      setPatientResponse((prev) => ({
                        ...prev,
                        q1: e.target.value,
                      }))
                    }
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 2 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    2. Have you experienced any side effects from this
                    medication?
                  </label>
                  <textarea
                    value={patientResponse.q2}
                    onChange={(e) =>
                      setPatientResponse((prev) => ({
                        ...prev,
                        q2: e.target.value,
                      }))
                    }
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 3 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    3. Are you taking any other medications or supplements?
                  </label>
                  <textarea
                    value={patientResponse.q3}
                    onChange={(e) =>
                      setPatientResponse((prev) => ({
                        ...prev,
                        q3: e.target.value,
                      }))
                    }
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 4 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    4. Do you have any allergies or conditions that the doctor
                    should be aware of?
                  </label>
                  <textarea
                    value={patientResponse.q4}
                    onChange={(e) =>
                      setPatientResponse((prev) => ({
                        ...prev,
                        q4: e.target.value,
                      }))
                    }
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => setShowChatForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={sendInquiry}
                  >
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

         {/* Chat Form Modal: Show only if Amitriptyline is found */}
         {isAmitriptyline && showChatForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 max-w-4xl p-5 bg-white rounded">
              <h2 className="mb-4 text-xl font-bold text-center">
                Chat with a Doctor about Amitriptyline
              </h2>
              <div className="flex flex-col gap-6">
                {/* Question 1 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    1. What symptoms have you been having?
                  </label>
                  <textarea
                    value={patientResponse.q1}
                    onChange={(e) => setPatientResponse((prev) => ({ ...prev, q1: e.target.value }))}
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 2 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    2. If Insomnia is part of the symptoms, have you had it for about 3 months?
                  </label>
                  <textarea
                    value={patientResponse.q2}
                    onChange={(e) => setPatientResponse((prev) => ({ ...prev, q2: e.target.value }))}
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 3 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    3. Do you have fast heartbeats or palpitations?
                  </label>
                  <textarea
                    value={patientResponse.q3}
                    onChange={(e) => setPatientResponse((prev) => ({ ...prev, q3: e.target.value }))}
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Question 4 */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    4. Are you always anxious? If yes, where does it come from? Did you lose a relative or a loved one?
                  </label>
                  <textarea
                    value={patientResponse.q4}
                    onChange={(e) => setPatientResponse((prev) => ({ ...prev, q4: e.target.value }))}
                    rows="4"
                    className="block w-full p-2 border rounded"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                    onClick={() => setShowChatForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={sendInquiry}
                  >
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
