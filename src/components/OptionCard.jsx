import { useEffect, useState } from 'react';
import '../styles/OptionCard.css';
import { styled } from '@mui/material/styles';
import { LinearProgress, linearProgressClasses } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#00FFFF' : '#308fe8',
  },
}));

export const OptionCard = ({ option, chosenOption, totalVotes }) => {
  // Width state
  const [width, setWidth] = useState(0);
  const [votePercentage, setVotePercentage] = useState(0);

  useEffect(() => {
    // Calculates vote percentages
    if (totalVotes !== 0)
      setVotePercentage(Math.floor((option.votes / totalVotes) * 100));
    else setVotePercentage(0);
  }, [option]);
  // Rerenders on change in total votes
  useEffect(() => {
    setTimeout(() => {
      setWidth(votePercentage);
    }, 600);
  }, [votePercentage]);

  return (
    <div
      id={option._id}
      className={
        // For Marking the selected option
        option._id === chosenOption
          ? `border border-success border-3 optionCard`
          : `optionCard`
      }
    >
      <h3 className=''>
        {/* Title  */}
        <p>{option.title}</p>
        {/* Vote percentage */}
        <span className='votePercentage'>{votePercentage} %</span>
      </h3>
      {/* Number of votes */}
      <p className='my-3'>{option.votes} Votes</p>
      <BorderLinearProgress variant='determinate' value={width} />
    </div>
  );
};
