import React, { useState } from 'react';
import { useAuthContext } from '../hooks';
import { useNavigate, Link } from 'react-router-dom';
import { LoginImage } from '../assets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { notify } from '../components/Notification';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginButtonDefaultState = { state: false, buttonTag: 'Login' };
  const [loggingIn, setLoggingIn] = useState({
    ...loginButtonDefaultState,
  });
  // Context hook for user functionalities
  const auth = useAuthContext();
  // Handles login form submit
  const handleFormSubmit = async function (event) {
    event.preventDefault();
    // sets the state to login mode and disables submit button to avoid multiple clicks
    setLoggingIn({
      state: true,
      buttonTag: (
        <span
          className='spinner-border spinner-border-sm text-light'
          role='status'
        ></span>
      ),
    });
    // Function call
    let response =await auth.login(email, password);
    // enables the form submit button
    setLoggingIn({ ...loginButtonDefaultState });
    if (!response) {
      return (
        <div className='container-fluid text-center'>Internal Server Error</div>
      );
    }
    if (response.success) {
      notify().success('Successfully Signed in');
      console.log('login sucessfull');
      // Redirect to shared link
    } else {
      // Login unsuccessful
      setEmail('');
      setPassword('');
      if (response.message === 'Unauthorized')
        notify().error('Invalid credentials');
      else if (response.message === 'Server is down')
        notify().error('Could not login');
      else notify().error('No User found.Register to begin');
    }
  };

  if (auth.user) {
    return navigate('/dashboard');
  }

  return (
    <div className='flex h-screen bg-primary gap-32'>
      <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col items-center justify-center p-8'>
        <div className='max-w-md w-full'>
          <h2 className='text-3xl font-semibold text-center text-secondary mb-6'>
            Sign In
          </h2>
          <form  id='login-form' onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-600 font-medium'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email Address'
                className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                form='login-form'
                required
              />
            </div>
            <div className='mb-4 relative'>
              <label className='block text-gray-600 font-medium'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  form='login-form'
                  required
                />
                <span
                  className='absolute top-2 right-3 cursor-pointer mt-1'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </span>
              </div>
              {error && (
                <p className='text-red-600 text-center mb-2'>{error}</p>
              )}
            </div>
            <Button
              type='submit'
              form='login-form'
              color='success'
              disabled={loggingIn.state}
              className='w-full text-white rounded-md py-2 font-semibold hover:bg-blue-600 transition duration-300'
            >
              {loggingIn.buttonTag}
            </Button>{' '}
            {/* {error && <p className="text-red-600 text-center mb-2">{error}</p>} */}
            <p className='text-gray-600 text-center'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-blue-500 hover:underline'>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className='hidden sm:block w-1/2 mt-11 ml-8'>
        <img src={LoginImage} alt='' />
      </div>
    </div>
  );
}

export default Login;
