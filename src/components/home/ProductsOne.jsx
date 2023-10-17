import React from 'react';
import { ProductsOneImage} from '../../assets';
import styles, { layout } from '../../styles';
// import { card } from "../assets";

const ProductsOne = () => (
  <section id='product' className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src={ProductsOneImage}
        alt='billing'
        className='w-[75%] h-[100%] relative z-[5]'
      />

      {/* gradient start */}
      <div className='absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient' />
      <div className='absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient' />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Creating Polls <br className='sm:block hidden' /> is a Breeze!
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Welcome to our Web Poll App, where you can effortlessly create engaging
        polls in just a few simple steps. Whether you're looking to gather
        opinions, make decisions, or conduct surveys, our intuitive and
        user-friendly poll creation process will help you get started in no
        time. Dive into the world of interactive polling and unlock a world of
        insights!
      </p>
    </div>
  </section>
);

export default ProductsOne;
