import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { Pollwise } from '../assets';
import { notify } from './Notification';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import LogoutIcon from '@mui/icons-material/Logout';

const NavigationBar = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [tabState, setTabState] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.logout();
    notify().success('Logged out');
    navigate('/login');
    handleClose();
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/mypolls', label: 'My Polls' },
    { to: '/myvotes', label: 'My Votes' },
  ];

  return (
    <nav className='bg-primary'>
      <div className=' mx-auto py-3 flex justify-between items-center text-center align-middle'>
    
          <div
            className={`flex text-center  justify-center items-start ${
              isMobile ? 'gap-4' : 'gap-96'
            }`}
          >
            <Link to='/' className='navbar-brand'>
              <img src={Pollwise} className='h-24 w-24' alt='PollWise' />
            </Link>
          
          </div>

          <div>
            {auth.user && (
              <div>
                <Button
                  id='basic-button'
                  aria-controls='basic-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <LogoutIcon
                    onClick={handleLogout}
                    sx={{ fontSize: '40px' }}
                  />
                </Button>
              </div>
            )}
          </div>

          {auth.user === null && (
            <div>
              {isMobile && (
                <Link to='/login'>
                  <button className='bg-light px-4 py-2 rounded-md mx-1'>
                    Login
                  </button>
                </Link>
              )}
              {isMobile && (
                <Link to='/sign-up' className='text-decoration-none'>
                  <button className='btn btn-primary'>Sign up</button>
                </Link>
              )}
            </div>
          )}
        
      </div>

      {auth.user && (
        <div className='w-full   bg-transparent'>
          <div className='flex flex-row justify-center gap-10 h-24 items-center'>
            {navLinks.map((link) => (
              <div
                key={link.to}
                className={`cursor-pointer mx-2 py-3 p-md-3 text-xl ${
                  location.pathname === link.to ? ' text-secondary' : 'text-white'
                }`}
                onClick={() => {
                  setTabState(link.label.toLowerCase());
                  navigate(link.to);
                }}
              >
                {link.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
