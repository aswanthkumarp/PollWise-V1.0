import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePollHorizontal,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getMyPolls, getMyVotedPolls, searchQuestions } from '../api';
import { Loader } from '../components/Loader';
import { useAuthContext } from '../hooks';
import { notify } from '../components/Notification';
import NavigationBar from '../components/NavigationBar';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [myPollsCount, setMypollsCount] = useState('-');
  const [myVotedPollsCount, setMyVotedPollsCount] = useState('-');
  const [searchKeyword, setSearchKeyword] = useState('');
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // Poll Created
      const pollsCreated = await getMyPolls();
      // Poll Voted
      const pollsVoted = await getMyVotedPolls();
      // If the request is not fulfilled
      if (!pollsCreated || !pollsVoted) {
        notify().error('Could not update');
        setLoading(false);
        return;
      }
      // If the request is fulfilled
      if (pollsCreated.success) {
        if (!pollsCreated.data.data) setMypollsCount(0);
        else setMypollsCount(pollsCreated.data.data.length);
      }

      if (pollsVoted.success) {
        if (!pollsVoted.data.data) setMyVotedPollsCount(0);
        else setMyVotedPollsCount(pollsVoted.data.data.length);
      }
      setLoading(false);
    }

    // Restricted Route
    if (auth.user) {
      if (auth.user.exp < Date.now()) {
        auth.catchError('Authentication Expired');
        return;
      } else fetchData();
    }
  }, []);

  const handleSearch = async () => {
    if (searchKeyword) {
      const response = await searchQuestions(searchKeyword);
      console.log('Response from searchQuestions:', response); // Add this line
      if (response.success) {
        const questions = response.data; // List of questions matching the keyword
        console.log('Questions data:', questions); // Add this line
        navigate('/search-results', { state: { questions: questions } });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='bg-primary text-white'>
      <div className='container mx-auto p-4'>
        <div className='flex flex-col justify-center  gap-10'>
          <button
            className=' text-black bg-boxcolor font-bold text-xl p-8 rounded-full w-full md:w-auto'
            onClick={() => {
              navigate('/poll/create-new');
            }}
          >
            Create Poll
          </button>

          <div className='flex flex-row flex-wrap justify-center items-center gap-4 md:gap-16 p-6'>
            <div className='w-full md:w-full lg:w-1/3 xl:w-full p-4'>
              <div className='rounded-lg shadow-md bg-boxcolor text-center p-4'>
                <FontAwesomeIcon
                  icon={faSquarePollHorizontal}
                  size='2x'
                  className='my-4 text-primary'
                />
                <h1 className='text-4xl font-bold text-primary'>
                  {myPollsCount}
                </h1>
                <div className='text-black text-3xl'>Polls Created</div>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'>
              <div className='rounded-lg shadow-md bg-boxcolor text-center p-4'>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size='2x'
                  className='my-4 text-primary'
                />
                <h1 className='text-4xl font-bold text-primary'>
                  {myVotedPollsCount}
                </h1>
                <div className='text-black text-3xl'>Polls Voted</div>
              </div>
            </div>
          </div>

          <div className='flex flex-row items-center justify-center  gap-4'>
            <input
              className=' text-black h-20 w-full md:w-2/3 lg:w-full mx-2 md:mx-0 md:my-2'
              placeholder='Type any keyword to search the Polls'
              type='text'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className='bg-boxcolor text-black font-bold text-xl p-8 h-1/3 rounded-md w-1/3 md:w-/12'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
