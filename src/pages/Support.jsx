import React, { useState } from "react";
import BackHeader from "../Components/BackHeader";
import { useLayout } from "../Features/LayoutContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
  const [questions, setQuestions] = useState([
    { question: "How can I Book pets food for monthly?", answer: "You can Book food using Bookings" },
    { question: "What is the refund policy?", answer: "We offer refunds within 30 days of purchase." },
    { question: "How can I contact support?", answer: "You can contact through email us at support@example.com." },
  ]);

  const [userQuestion, setUserQuestion] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { isSidebarOpen, isSearchOpen } = useLayout();

  const handleQuestionChange = (e) => {
    setUserQuestion(e.target.value);
  };

  const handleQuestionSubmit = () => {
    if (userQuestion.trim()) {
      setUserQuestion("");
      setShowForm(false);
      toast.success("Thank you! Your question has been submitted.");
    } else {
      toast.error("Please enter a valid question.");
    }
  };

  return (
    <div className="bg-gray-800 h-[750px]">
      {!isSidebarOpen && !isSearchOpen && <BackHeader title="Back" />}
      <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md mt-8">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Support - Frequently Asked Questions</h1>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800">{item.question}</h3>
              <p className="text-gray-600 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>

        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded-md">
            Ask a Question
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <textarea
              value={userQuestion}
              onChange={handleQuestionChange}
              className="w-full p-4 rounded-md border border-gray-300"
              placeholder="Write your question here..."
              rows="4"
            ></textarea>
            <div className="flex justify-between">
              <button onClick={handleQuestionSubmit} className="bg-gray-800 text-white py-2 px-4 rounded-md">
                Submit Question
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-white border border-gray-800 text-gray-800 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
