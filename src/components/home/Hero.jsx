import styles from '../../styles';
import { HeroImage } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks';

const Hero = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const handleStart = () => {
    if (auth.user) {
      return navigate('/dashboard');
    } else {
      return navigate('/login');
    }
  };
  return (
    <section
      id='home'
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
            Ask <br className='sm:block hidden' /> Engage{' '}
            <br className='sm:block hidden' /> Decide with
          </h1>
        </div>
        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full'>
          <span className='text-gradient text-cyan-400'>Pollwise</span>
        </h1>
        <p
          className={`${styles.paragraph} max-w-[470px] mt-2 md:mt-4 text-gray-300 text-lg`}
        >
          Simplify decisions with Pollwise. Create, share, and analyze polls
          effortlessly. Engage your audience and make informed choices, whether
          for work or fun. Try Pollwise today!{' '}
        </p>

        <button
          onClick={handleStart}
          className=' bg-cyan-500 text-white py-4 px-6 rounded-full mt-4 '
        >
          Get Started
        </button>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={HeroImage}
          alt='billing'
          className='w-[100%] h-[100%] relative z-[5]'
        />
      </div>
    </section>
  );
};

export default Hero;
