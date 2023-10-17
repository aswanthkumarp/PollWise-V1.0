import React from 'react';

import styles, { layout } from '../../styles';
import { ProductsTwoImage } from '../../assets';
const ProductsTwo = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Real-Time Results <br className='sm:block hidden' /> at Your Fingertips.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Experience the Simplicity of Data Presentation! Our Web Poll App
        showcases your poll results in real-time, with a straightforward linear
        progression. See the votes accumulate and witness the winning choice
        emerge as your audience participates. Stay updated on the poll's status
        with our intuitive and linear display.
      </p>
    </div>

    <div className={layout.sectionImg}>
      <img
        src={ProductsTwoImage}
        alt='pollresultimage'
        className='w-[100%] h-[100%]'
      />
    </div>
  </section>
);

export default ProductsTwo;
