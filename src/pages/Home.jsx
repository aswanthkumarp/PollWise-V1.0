import React from 'react';
import styles from '../styles';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductsOne from '../components/home/ProductsOne';
import ProductsTwo from '../components/Home/ProductsTwo';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/home/Footer';

function Home() {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Features />
          <ProductsOne />
          <ProductsTwo />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
