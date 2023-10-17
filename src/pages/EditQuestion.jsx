import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchQuestionById, editQuestion } from '../api';
import { notify } from '../components/Notification';
import { Loader } from '../components/Loader';
import NavigationBar from '../components/NavigationBar';

const EditQuestion = () => {
  const [loading, setLoading] = useState(true);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    title: '',
    options: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetchQuestionById(id);

      if (response.success) {
        const _title = response.data.data.title;
        const _options = response.data.data.options.map((option) => {
          return {
            id: option._id,
            title: option.title,
          };
        });
        setUpdatedQuestion({ title: _title, options: _options });
      } else {
        notify().error('Failed to fetch question');
      }

      setLoading(false);
    }

    fetchQuestion();
  }, [id]);

  const handleSave = async () => {
    try {
      const payload = {
        ...updatedQuestion,
        options: updatedQuestion.options.map((option) => option.title),
      };
      const response = await editQuestion(id, payload);

      if (response.success) {
        notify().success('Question updated successfully');
        setUpdatedQuestion(response.data.data);
        navigate(`/poll/results/${id}`);
      } else {
        notify().error('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleOptionChange = (id, newValue) => {
    const updatedOptions = updatedQuestion.options;
    const optionIndex = updatedOptions.findIndex((option) => option.id === id);
    const changedOption = { ...updatedOptions[optionIndex], title: newValue };
    updatedOptions[optionIndex] = changedOption;

    setUpdatedQuestion((prevState) => ({
      ...prevState,
      options: updatedOptions,
    }));
  };

  return (
    <div className='bg-primary text-white min-h-screen'>
      
      {loading ? (
        <Loader />
      ) : (
        <div className='text-center text-white p-4'>
          <h2 className='text-4xl font-bold text-white mb-6'>Edit Question</h2>
          <div className='flex items-center justify-center mt-4 gap-3'>
            <span className='text-2xl font-semibold block mb-2'>Question:</span>
            <input
              className='w-1/2 h-24 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500 text-black'
              type='text'
              value={updatedQuestion.title}
              onChange={(e) =>
                setUpdatedQuestion({
                  ...updatedQuestion,
                  title: e.target.value,
                })
              }
            />
          </div>
          {updatedQuestion.options.map((option, index) => (
            <div
              key={option.id}
              className='flex items-center justify-center mt-4 gap-3'
            >
              <label className='text-2xl font-semibold'>{`Option ${
                index + 1
              }:`}</label>
              <input
                className=' w-1/3 h-16 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500 text-black'
                type='text'
                value={option.title}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
              />
            </div>
          ))}
          <button
            className='bg-boxcolor text-white text-xl font-semibold px-4 py-2 rounded-md mt-6'
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditQuestion;
