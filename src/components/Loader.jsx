import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export  const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={55} />
    </div>
  );
};
