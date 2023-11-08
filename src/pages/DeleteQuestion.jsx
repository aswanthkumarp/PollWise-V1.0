import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../components/Notification';

import { LOCALSTORAGE_TOKEN_KEY } from '../utils';

const DeleteQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const handleDeleteQuestion = async () => {
    try {
      const response = await fetch(
        `https://pollwisev1.onrender.com/api/question/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        notify().success('Question deleted successfully');
        navigate('/dashboard');
      } else if (response.status === 401) {
        notify().error('Unauthorized to delete this question');
      } else {
        notify().error('Error deleting the question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      notify().error('An error occurred while deleting the question');
    }
  };

  return (
    <div className='bg-primary text-white h-screen'>
      <div className='text-center'>
        <h1>Are you sure you want to delete this question?</h1>
        <button
          onClick={handleDeleteQuestion}
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteQuestion;
