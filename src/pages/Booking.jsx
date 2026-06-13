import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackHeader from '../Components/BackHeader';
import { useLayout } from '../Features/LayoutContext';

const Booking = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryFrequency, setDeliveryFrequency] = useState('monthly');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [bookingDetails, setBookingDetails] = useState(null); 

  const { isSidebarOpen, isSearchOpen } = useLayout();

  const foodOptions = ['Dog Food', 'Cat Food'];
  const frequencyOptions = ['Weekly', 'Monthly', 'Quarterly'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!petName.trim() || !selectedFood || quantity < 1) {
      toast.error('Please complete all fields correctly.');
      return;
    }

    const bookingData = {
      petName,
      petType,
      selectedFood,
      quantity: parseInt(quantity),
      deliveryFrequency,
    };

    setBookingDetails(bookingData); 
    toast.success(`Booking successful for ${petName} (${petType})!`);

    
    setPetName('');
    setPetType('dog');
    setSelectedFood('');
    setQuantity(1);
    setDeliveryFrequency('monthly');
  };

  return (
    <div className='bg-gray-800 min-h-screen pb-10'>
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}

      <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pet Food Booking</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="petName" className="block text-gray-800">Pet Name</label>
            <input
              type="text"
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your pet's name"
            />
          </div>

          <div>
            <label htmlFor="petType" className="block text-gray-800">Pet Type</label>
            <select
              id="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <div>
            <label htmlFor="selectedFood" className="block text-gray-800">Select Food</label>
            <select
              id="selectedFood"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Food Type</option>
              {foodOptions.map((food, index) => (
                <option key={index} value={food}>{food}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-gray-800">Quantity (bags)</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              min="1"
            />
          </div>

          <div>
            <label htmlFor="deliveryFrequency" className="block text-gray-800">Delivery Frequency</label>
            <select
              id="deliveryFrequency"
              value={deliveryFrequency}
              onChange={(e) => setDeliveryFrequency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              {frequencyOptions.map((frequency, index) => (
                <option key={index} value={frequency.toLowerCase()}>{frequency}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Book Now
          </button>
        </form>

       
        {bookingDetails && (
          <div className="mt-8 p-4 bg-white border border-gray-300 rounded-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Details</h3>
            <p><strong>Pet Name:</strong> {bookingDetails.petName}</p>
            <p><strong>Pet Type:</strong> {bookingDetails.petType}</p>
            <p><strong>Food:</strong> {bookingDetails.selectedFood}</p>
            <p><strong>Quantity:</strong> {bookingDetails.quantity} bag(s)</p>
            <p><strong>Delivery Frequency:</strong> {bookingDetails.deliveryFrequency}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
