import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { getIsEmailUnique as isUnique, signup } from '../api';
import { notify } from '../components/Notification';
import { useAuthContext } from '../hooks';
import { SignupImage } from '../assets';

export const SignUp = function () {
  const auth = useAuthContext();
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    message: '',
  });
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState('');
  const [confimrPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Allover Form Validation
  // If valdiated ,Submit button is enabled
  const [formInputValidation, setFormInputValidation] = useState(true);
  const navigate = useNavigate();
  // UseEffect hook to update All over Form validaiton
  useEffect(() => {
    //Compulsory feild check
    if (email !== '' && password !== '')
      setFormInputValidation(
        emailValidation.isValid && passwordValidation.isValid
      );
  }, [emailValidation, passwordValidation]);
  // Hook for email Validation.
  useEffect(() => {
    getIsEmailUnique(); //checks if the email is unique
    if (email !== '' && password !== '')
      setFormInputValidation(
        emailValidation.isValid && passwordValidation.isValid
      );
  }, [email]);

  // To update password validaiton on change in password and confirm password change
  useEffect(() => {
    isPasswordValidate();
  }, [password, confimrPassword]);

  // Function to check if email is unique
  const getIsEmailUnique = async () => {
    // Matches the regular expression
    if (
      !String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      setEmailValidation({ isValid: false, message: 'Not a valid email' });
      return;
    }
    // Checks if email is unique and updates validation state
    let isEmailUnique = await isUnique(email);
    if (!isEmailUnique) {
      notify().error('Could not validate email');
      return;
    }
    if (isEmailUnique.success) {
      setEmailValidation({ isValid: true });
    } else {
      setEmailValidation({ isValid: false, message: 'Email id Taken' });
    }
  };
  // Checks if Password is validate
  const isPasswordValidate = () => {
    if (password.length < 6) {
      setPasswordValidation({
        isValid: false,
        message: 'Minimum 6 characters',
      });
      return;
    } else {
      if (password !== confimrPassword) {
        setPasswordValidation({
          isValid: false,
          message: 'Passwords do not match',
        });
      } else {
        setPasswordValidation({ isValid: true });
      }
    }
  };


  // Handles Form Submit
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      // Freezes button
      setLoading(true);
      // Sends sign up request through API
      let response = await signup(email, name, password);

      setLoading(false);
      if (!response) {
        notify.error('Could not Sign up');
      }
      if (response.success) {
        notify().success('Successfully Signed up');
        // Reset Form
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Redirect to login
        navigate('/login');
      } else {
        // If registration fails,Error notification is shown
        notify().error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // if user is logged in redirect to login page
  if (auth.user) {
    return navigate('/login');
  }

  const redirectToLogin = () => {
    navigate('/login');
  };
  return (
    <div className='bg-primary h-screen flex gap-32 '>
      <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col items-center justify-center p-8 '>
        <h2 className='text-3xl font-semibold text-secondary mb-6'>Sign Up</h2>
        <form
          className='max-w-md w-full'
          id='sign-up-form'
          onSubmit={handleFormSubmit}
        >
          <div className='mb-4'>
            {/* Email */}
            <label className='block text-black font-medium'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Please Enter Your Email Address'
              className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
              form='sign-up-form'
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          {/* Email Validaiton Message */}
          {email !== '' && !emailValidation.isValid && (
            <div className='mb-4 font-bold text-red-700'>
              *{emailValidation.message}
            </div>
          )}
          <div className='mb-4'>
            {/* Name */}
            <label className='block text-black font-medium'>Full Name</label>
            <input
              type='name'
              name='name'
              id='name'
              placeholder='Please Enter Your Full Name'
              className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
              form='sign-up-form'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className='mb-4'>
            {/* Password */}
            <label className='block text-black font-medium'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
              form='sign-up-form'
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className='mb-4'>
            {/* Confirm password */}
            <label className='block text-black font-medium'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirm_password'
              id='confirm_password'
              placeholder='Confirm Password'
              className='w-full border rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500'
              form='sign-up-form'
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          {/* Passowrd Validation messages */}
          {passwordValidation.isValid && (
            <div className='mb-4 font-bold text-red-700'>Passwords match</div>
          )}
          {password !== '' && !passwordValidation.isValid && (
            <div className='mb-4 font-bold text-red-700'>
              *{passwordValidation.message}
            </div>
          )}
          {/* Submit button */}
          <Button
            variant='contained'
            
            color={formInputValidation ? 'primary' : 'secondary'} // Use 'primary' or 'secondary' here
            className='col-10 col-lg-3 m-4 p-2 text-white'
            type='submit'
            form='sign-up-form'
            disabled={!formInputValidation || loading}
          >
            {loading ? 'Signing..' : 'Sign up'}
          </Button>{' '}
          {''}
          <p className='text-gray-600 text-center'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login Here
            </Link>
          </p>
        </form>
      </div>
      <div className='hidden sm:block w-1/2 mt-11 ml-8'>
        <img src={SignupImage} alt='' />
      </div>
    </div>
  );
};
