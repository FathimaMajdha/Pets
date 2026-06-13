import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackHeader = ({ title = "Back" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 px-2 py-3  bg-white sticky top-0 z-50">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 hover:text-black text-lg flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        <span>{title}</span>
      </button>
    </div>
  );
};

export default BackHeader;
