import { useState, useEffect } from 'react';
import { getFormattedDate } from '../utils';
import { getMyVotedPolls } from '../api';
import { Loader } from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { notify } from '../components/Notification';

export const MyVotedPolls = () => {
  const [loading, setLoading] = useState(true);
  const [myVotedPolls, setMyVotedPolls] = useState([]);
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const pollsVoted = await getMyVotedPolls();

      if (!pollsVoted) {
        notify().error('Could not update');
        setLoading(false);
        return;
      }
      if (pollsVoted.success && pollsVoted.data.data) {
        setMyVotedPolls(pollsVoted.data.data);
      }
      setLoading(false);
    }

    if (auth.user) {
      if (auth.user.exp < Date.now()) auth.catchError('Authentication Expired');
      else fetchData();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='bg-primary text-white min-h-screen'>
      <div>
        <h1 className='font-bold text-white text-4xl text-center mb-6'>
          Polls Voted
        </h1>
        <div className='flex flex-col gap-16 p-6 justify-center items-center'>
          {myVotedPolls.length < 1 && (
            <h3 className='mx-auto text-4xl text-white font-bold'>
              - No polls Voted -
            </h3>
          )}
          {myVotedPolls.map((poll) => {
            return (
              <div
                key={poll._id}
                className='w-full poll-box flex flex-col p-6 align-middle justify-center gap-2 items-center max-w-md md:max-w-lg lg:max-w-2xl rounded-lg border bg-boxcolor border-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => navigate(`/poll/results/${poll._id}`)}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
