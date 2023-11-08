import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import CopyButton from '../components/CopyButton';
import { OptionCard } from '../components/OptionCard';
import { useAuthContext, useLoading } from '../hooks';
import { getPollResults, getUserChosenOption } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/PollResults.css';
import { getFormattedDate } from '../utils';
import { ErrorNotFound } from './Error404';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { notify } from '../components/Notification';
import { socketManager } from '../socket';

export const PollResults = () => {
  const questionID = useParams().id;
  const [loading, setLoading] = useLoading(true);
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [question, setQuestion] = useState(null);
  const [chosenOption, setChosenOption] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPollDetails() {
      const responsePollResults = await getPollResults(questionID);

      setLoading(false);
      if (!responsePollResults) {
        notify().error('Could not Load');
        return;
      }

      if (responsePollResults && responsePollResults.success) {
        setQuestion(responsePollResults.data.data);
      }
    }
    async function fetchDataCookie() {
      const objectString = Cookies.get('pollwise');
      if (objectString) {
        // contains the ID of questions voted
        const questions = JSON.parse(objectString);
        // if the user has already voted the question
        if (questions.hasOwnProperty(questionID)) {
          setChosenOption(questions[questionID]);
        } else {
        }
      }
    }
    async function fetchDataAPI() {
      // Poll Results

      const userResponse = await getUserChosenOption(questionID);
      if (!userResponse) {
        notify().error('Could not Load');
        return;
      }
      if (userResponse.success) {
        setChosenOption(userResponse.data.data);
      }

      // question state changed.
    }
    socketManager.addListener('recordedVote', (qID) => {
      if (qID === questionID) {
        fetchPollDetails();

        let totalVotes = document.querySelector(`.totalVotes`);

        if (totalVotes) {
          totalVotes.classList.add('totalVotesChange');

          setTimeout(() => {
            totalVotes.classList.remove('totalVotesChange');
          }, 1000);
        }
      }
    });

    // First fetch the poll details and then check if the user is anonymous
    // If anonymous then check the cookies, and if logged in, check with the server

    fetchPollDetails();
    if (auth.user) fetchDataAPI();
    else fetchDataCookie();
    return () => {
      socketManager.removeListener('recordedVote');
    };
    // eslint-disable-next-line
  }, []);

  function getTotalNumberofVotes(question) {
    if (question) {
      let totalVotesCount = question.options.reduce((sum, element) => {
        return sum + element.votes;
      }, 0);
      return totalVotesCount;
    }
  }

  if (loading) {
    return <Loader />;
  }
  if (!question) {
    return <ErrorNotFound />;
  }

  const handleShareClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div id={`q-${question._id}`} className='bg-primary text-white'>
      <div className=' flex flex-col justify-center items-center'>
        <p className='text-end my-5'>
          <span
            style={{ cursor: 'pointer' }}
            className='text-white'
            onClick={handleShareClick}
          >
            Share <FontAwesomeIcon icon={faExternalLinkAlt} />
          </span>
        </p>
        <div className='flex flex-col md:flex-row items-start text-center'>
          <div>
            <h1 className='font-bold text-3xl'>{question.title}</h1>
            <h6 className='text-white my-4'>
              Asked by <span className='text-dark'>{question.user.name}</span>{' '}
              on{' '}
              <span className='mx-2'>
                {getFormattedDate(new Date(question.createdAt))}
              </span>
            </h6>
          </div>

          <div className='totalVotes col-4 col-md-2 mx-auto mx-md-0 ms-md-auto p-3 d-md-block'>
            <h3 className='text-center text-white'>Votes</h3>
            <h2 className='text-center font-bold'>
              {getTotalNumberofVotes(question)}
            </h2>
          </div>
        </div>
        {question.options.map((option) => (
          <OptionCard
            key={option._id}
            option={{
              ...option,
            }}
            totalVotes={getTotalNumberofVotes(question)}
            chosenOption={chosenOption}
          />
        ))}
        <div className='text-center'>
          <button
            className='bg-green-500 text-white p-4 col-10 col-md-4 rounded-md'
            onClick={() => {
              navigate(`/poll/${questionID}`);
            }}
          >
            Submit Vote
          </button>
        </div>

        {showModal && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-primary w-96 p-4 rounded-lg shadow-md'>
              <h2 className='text-2xl font-bold mb-4'>Share Link</h2>
              <p className='text-white'>Poll Vote Link</p>
              <div className=' p-2 rounded' id='copy-link'>
              https://pollwise.netlify.app/poll/{question._id}
              </div>
              <p className='text-white mt-4'>
                Copy the link from above to easily share this poll.
              </p>
              <div className='mt-4 text-center'>
                <CopyButton />
              </div>
              <button
                className='mt-4  text-white bg-boxcolor text-sm py-2 px-4 rounded hover:bg-gray-300'
                onClick={handleShareClick}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
