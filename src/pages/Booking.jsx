import React, { useState } from 'react';

const Booking = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryFrequency, setDeliveryFrequency] = useState('monthly');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');
  const [alertMessage, setAlertMessage] = useState('');

  const foodOptions = ['Dog Food', 'Cat Food'];
  const frequencyOptions = ['Weekly', 'Monthly', 'Quarterly'];

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!petName || !selectedFood) {
      setAlertMessage('Please complete all the fields before submitting.');
      return;
    }
    setAlertMessage(`Booking successful! ${quantity} bags of ${selectedFood} for ${petName} (${petType}). Delivery: ${deliveryFrequency}.`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pet Food Booking</h2>

     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="petName" className="block text-gray-700">Pet Name</label>
          <input
            type="text"
            id="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your pet's name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="petType" className="block text-gray-700">Pet Type</label>
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

        <div className="space-y-2">
          <label htmlFor="selectedFood" className="block text-gray-700">Select Food</label>
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

        <div className="space-y-2">
          <label htmlFor="quantity" className="block text-gray-700">Quantity (bags)</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="deliveryFrequency" className="block text-gray-700">Delivery Frequency</label>
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>

     
      {alertMessage && (
        <div className="mt-4 text-center text-green-600 font-semibold">{alertMessage}</div>
      )}
    </div>
  );
};

export default Booking;
