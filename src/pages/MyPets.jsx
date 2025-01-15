import React, { useState } from 'react';

const MyPets= () => {
  const [pets, setPets] = useState([
    { id: 1, name: 'Max', type: 'Dog', food: 'Dog Food', frequency: 'Monthly' },
    { id: 2, name: 'Mittens', type: 'Cat', food: 'Cat Food', frequency: 'Monthly' },
  ]);

  const [newPet, setNewPet] = useState({ name: '', type: '', food: '', frequency: '' });
  const [isAddingPet, setIsAddingPet] = useState(false);

  const foodOptions = ['Dog Food', 'Cat Food', 'Bird Food', 'Fish Food'];
  const frequencyOptions = ['Weekly', 'Monthly', 'Quarterly'];

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleAddPet = (e) => {
    e.preventDefault();
    if (newPet.name && newPet.type && newPet.food && newPet.frequency) {
      setPets([...pets, { ...newPet, id: pets.length + 1 }]);
      setNewPet({ name: '', type: '', food: '', frequency: '' });
      setIsAddingPet(false);
    }
  };

  
  const handleDeletePet = (petId) => {
    setPets(pets.filter((pet) => pet.id !== petId));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Pets</h2>

     
      <div className="space-y-4">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet.id} className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800">{pet.name}</h3>
              <p className="text-gray-600">Type: {pet.type}</p>
              <p className="text-gray-600">Food: {pet.food}</p>
              <p className="text-gray-600">Delivery Frequency: {pet.frequency}</p>
              <button
                onClick={() => handleDeletePet(pet.id)}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Remove Pet
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">You have no pets added. Please add a pet.</p>
        )}
      </div>

     
      {!isAddingPet ? (
        <button
          onClick={() => setIsAddingPet(true)}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add New Pet
        </button>
      ) : (
        <div className="mt-6 space-y-4">
          
          <form onSubmit={handleAddPet} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-700">Pet Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newPet.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your pet's name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-gray-700">Pet Type</label>
              <select
                id="type"
                name="type"
                value={newPet.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Pet Type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="fish">Fish</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="food" className="block text-gray-700">Food Type</label>
              <select
                id="food"
                name="food"
                value={newPet.food}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Food Type</option>
                {foodOptions.map((food, index) => (
                  <option key={index} value={food}>{food}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="frequency" className="block text-gray-700">Delivery Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={newPet.frequency}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Delivery Frequency</option>
                {frequencyOptions.map((frequency, index) => (
                  <option key={index} value={frequency.toLowerCase()}>{frequency}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add Pet
            </button>
            <button
              type="button"
              onClick={() => setIsAddingPet(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyPets;
