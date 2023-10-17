import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (
    !location ||
    !location.state ||
    !Array.isArray(location.state.questions.data)
  ) {
    return <div>State is undefined or questions are not available.</div>;
  }

  const { data: questions } = location.state.questions;

  return (
    <div className='bg-primary h-screen'>
      <div className='container mx-auto p-4'>
        <div className='text-center text-white'>
          <h1 className='text-4xl font-bold text-black mt-6 mb-10'>
            Questions Found
          </h1>
        </div>
        <div className='flex flex-wrap justify-center -mx-4'>
          {questions.map((question) => (
            <div
              key={question._id}
              className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'
            >
              <div className='bg-secondary rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition duration-300 ease-in-out'>
                <div
                  className='p-6 align-middle justify-center items-center'
                  onClick={(event) => navigate(`/poll/results/${question._id}`)}
                >
                  <h2 className='text-2xl font-bold text-white'>
                    {question.title}
                  </h2>
                  <p className='text-sm text-gray-500'>
                    Created On: {question.createdAt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center mt-6'>
          <button
            className='bg-black text-white py-2 px-4 rounded'
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
