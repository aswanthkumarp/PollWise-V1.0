import styles from '../../styles';
import { Pollwise } from '../../assets';
import { footerLinks, socialMedia } from '../../constants';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useState } from 'react';
// import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     setError(null);

  //     try {
  //       const response = await axios.post('http://localhost:3000/api/subscribe', { email });
  //       alert('Subscription Successful');
  //       setEmail('');
  //     } catch (error) {
  //       setError('Unable to subscribe. Please try again later.');
  //       console.error('Subscription Error:', error);
  //     }
  //   };
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full `}>
        <div className=' flex-1 flex flex-col justify-start mr-10'>
          <img
            src={Pollwise}
            alt='PollWise Logo'
            className='w-[266px] h-[100px] object-contain'
          />
          <p className={`${styles.paragraph} mt-4 max-w-[312px] `}>
            Revolutionizing the way you engage and gather insights effortlessly.
          </p>
        </div>

        <div className='flex-[1] w-full flex flex-row  flex-wrap md:mt-0 mt-10'>
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className='font-poppins font-medium text-[18px] leading-[27px] text-white'>
                {footerlink.title}
              </h4>
              <ul className='list-none mt-4'>
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-black cursor-pointer ${
                      index !== footerlink.links.length - 1 ? 'mb-4' : 'mb-0'
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='flex flex-col relative'>
          <h4 className='font-poppins font-medium text-[18px] leading-[27px] text-white mb-2'>
            Subscribe for Updates
          </h4>
          <div className='flex items-center'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='Enter your email'
              className='w-[220px] md:w-[300px] py-2 px-3 rounded-md outline-none border border-dimWhite text-black placeholder-dimWhite focus:border-primary mr-2'
            />
            <button
              className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-black'
              //   onClick={handleSubmit}
            >
              Subscribe
            </button>
          </div>
          <div
            className='cursor-pointer  flex flex-col items-end justify-end mt-12'
            onClick={scrollToTop}
          >
            <NavigationIcon color='cyan' sx={{ fontSize: 40, color: 'cyan' }} />
            <h1 className='text-white'>Move to Top</h1>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]'>
        <p className='font-poppins font-normal text-center text-[18px] leading-[27px] text-white'>
          Copyright Ⓒ 2023 PollWise. All Rights Reserved.
        </p>

        <div className='flex flex-row md:mt-0 mt-6'>
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
