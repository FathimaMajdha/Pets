import React, { useState } from 'react';
import BackHeader from '../Components/BackHeader';
import { useLayout } from '../Features/LayoutContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', type: '', food: '' });
  const [isAddingPet, setIsAddingPet] = useState(false);
  const { isSidebarOpen, isSearchOpen } = useLayout();

  const foodOptions = ['Dog Food', 'Cat Food'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPet = (e) => {
    e.preventDefault();

    const { name, type, food } = newPet;
    if (name && type && food) {
      const petToAdd = {
        ...newPet,
        id: Date.now(), 
      };

      setPets((prev) => [...prev, petToAdd]);
      toast.success(`${name} added successfully! 🐾`);
      setNewPet({ name: '', type: '', food: '' });
      setIsAddingPet(false);
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  const handleDeletePet = (petId) => {
    setPets((prev) => prev.filter((pet) => pet.id !== petId));
    toast.info('Pet removed.');
  };

  return (
    <div className='bg-gray-800 min-h-screen pb-10'>
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}
      <div className="p-6 w-[600px] mx-auto bg-white rounded-lg shadow-md mt-6">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Pets</h2>

        <div className="space-y-4">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet.id} className="bg-gray-800 p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-lg text-white">{pet.name}</h3>
                <p className="text-white">Type: {pet.type}</p>
                <p className="text-white">Food: {pet.food}</p>
                <button
                  onClick={() => handleDeletePet(pet.id)}
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Remove Pet
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800">You have no pets added. Please add a pet.</p>
          )}
        </div>

        {!isAddingPet ? (
          <button
            onClick={() => setIsAddingPet(true)}
            className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded-md"
          >
            Add New Pet
          </button>
        ) : (
          <form onSubmit={handleAddPet} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-800">Pet Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newPet.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-gray-800">Pet Type</label>
              <select
                id="type"
                name="type"
                value={newPet.type}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="food" className="block text-gray-800">Food Type</label>
              <select
                id="food"
                name="food"
                value={newPet.food}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Food Type</option>
                {foodOptions.map((food, i) => (
                  <option key={i} value={food}>{food}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 font-bold text-white py-2 px-4 rounded-md"
            >
              Add Pet
            </button>
            <button
              type="button"
              onClick={() => setIsAddingPet(false)}
              className="w-full bg-white border border-gray-800 font-bold text-gray-800 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyPets;
