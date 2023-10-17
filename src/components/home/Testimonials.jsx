import styles from '../../styles';
import Carousel from 'react-material-ui-carousel';
import { testimonialsData } from '../../constants';
import StarIcon from '@mui/icons-material/Star';
const Testimonials = () => (
  <section
    id='clients'
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
  >
    <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40' />

    <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
      <h2 className='text-black text-6xl'>
        What People are <br className='sm:block hidden' /> saying about us
      </h2>
      <div className='w-full md:mt-0 mt-6 ml-auto flex flex-row justify-end'>
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
          Join the Pollwise community and discover the power of real-time
          polling.
        </p>
      </div>
    </div>
    <div className='w-full h-2/5'>
      <Carousel className='carousel-root w-full h-full'>
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className='testimonial-slide'>
            <div className='flex flex-col items-center justify-center p-6 text-white'>
              <img
                src={testimonial.imgSrc}
                alt={testimonial.name}
                className='w-40 h-40 rounded-full'
              />
              <h6 className='text-center text-2xl'>{testimonial.comment}</h6>
              <p className='text-center'>- {testimonial.name}</p>
              <div className='flex justify-center'>
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <StarIcon key={index} className='text-yellow-500' />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </section>
);

export default Testimonials;
