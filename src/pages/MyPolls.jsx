import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyPolls } from '../api';
import { Loader } from '../components/Loader';
import { getFormattedDate } from '../utils';
import { useAuthContext } from '../hooks';
import { notify } from '../components/Notification';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MyPolls = () => {
  const [loading, setLoading] = useState(true);
  const [myPolls, setMyPolls] = useState([]);
  const navigate = useNavigate();
  const auth = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      const pollsCreated = await getMyPolls();

      if (!pollsCreated) {
        notify().error('Could not update');
        setLoading(false);
        return;
      }

      if (pollsCreated.success && pollsCreated.data.data) {
        setMyPolls(pollsCreated.data.data);
      }
      setLoading(false);
    }

    if (auth.user) {
      if (auth.user.exp < Date.now())
        auth.catchError('Authentication Expired hereeeee');
      else fetchData();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='bg-primary text-white min-h-screen'>
      <h1 className='font-bold text-white text-4xl text-center mb-6'>
        Polls Created
      </h1>
      <div className='flex flex-col gap-16 p-6 justify-center items-center'>
        {myPolls.length < 1 && (
          <h3 className='mx-auto text-4xl text-white font-bold'>
            - No Polls created -
          </h3>
        )}
        {myPolls.map((poll) => (
          <div
            onClick={() => navigate(`/poll/results/${poll._id}`)}
            className='w-full flex flex-col gap-2 items-center max-w-md md:max-w-lg lg:max-w-2xl rounded-lg border bg-boxcolor border-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
            key={poll._id}
          >
            <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl'>
              {poll.title}
            </h2>
            <h5 className='text-1xl md:text-2xl lg:text-3xl font-bold text-black'>
              <span className='text-black'>Created by </span>
              {poll.user.name}
            </h5>
            <p className='text-gray-600 text-sm md:text-base lg:text-lg'>
              on {getFormattedDate(new Date(poll.createdAt))}
            </p>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <div
                className='text-white font-bold cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/delete/${poll._id}`);
                }}
              >
                <DeleteIcon sx={{ fontSize: '50px' }} />
              </div>
              <div
                className='text-white font-bold cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${poll._id}`);
                }}
              >
                <EditIcon sx={{ fontSize: '50px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPolls;
