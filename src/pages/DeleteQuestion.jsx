import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { notify } from "../components/Notification";
import NavigationBar from "../components/NavigationBar";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils";


const DeleteQuestion = () => {
const {id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const handleDeleteQuestion = async () => {
  
    try {
      const response = await fetch(`http://localhost:8000/api/question/delete/${id}`, {
        method: "DELETE", // Use the appropriate HTTP method (GET, POST, etc.)
        headers: {
          "Authorization": `Bearer ${token}`, // Add your JWT token here
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        notify().success("Question deleted successfully");
        navigate("/dashboard"); // Redirect to the desired page after deletion
      } else if (response.status === 401) {
        notify().error("Unauthorized to delete this question");
      } else {
        notify().error("Error deleting the question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      notify().error("An error occurred while deleting the question");
    }
  };

  return (
    <div className="bg-primary text-white h-screen">
      <NavigationBar />
      <div className="text-center">
        <h1>Are you sure you want to delete this question?</h1>
        <button
          onClick={handleDeleteQuestion}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteQuestion;
