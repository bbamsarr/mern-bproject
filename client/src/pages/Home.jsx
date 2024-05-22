import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaHome, FaHeart, FaCompass, FaMagic } from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

const fadeInAnimationFromLeft = {
  initial: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
};

const fadeInAnimationFromRight = {
  initial: { opacity: 0, x: 75 },
  visible: { opacity: 1, x: 0 },
};


export default function Home() {
  const [petListings, setPetListings ] = useState([]);

  useEffect(() => {
    const fetchPetListings = async () => {
      try {
        const res = await fetch('/api/listing/get?limit=3');
        const data = await res.json();
        setPetListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPetListings();
  }, []);

  return (
    <main className='max-w-[1920px] mx-auto overflow-hidden'>


      <section className="hero h-[640px] xl:h-[840px] bg-cover bg-center bg-fixed xl:rounded-br-[300px] relative z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <div className="container mx-auto h-full flex items-center justify-center xl:justify-start">
            <motion.div variants={fadeInAnimation} initial="initial" animate="visible" transition={{duration:1}} className='mx-auto flex flex-col items-center text-center xl:items-start'>
              <h1 className='text-4xl xl:text-6xl font-semibold tracking-widest text-white mb-8'> Welcome to PetAdopt!</h1>
              <span className='text-white mb-4'> At PetAdopt, we believe every pet deserves a loving home. Whether you are looking for a playful puppy, kitten, or an older pet, you will find a perfect match here! </span>
              <Link to={'/search'} className='mx-auto xl:mx-0 text-white border border-white p-3 rounded-lg hover:bg-white hover:text-black transition-all duration-500 ease-in-out'> Search for pets </Link>
            </motion.div>
          </div>
      </section>
  


      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] relative'>
        <div className='container mx-auto'> 
          <div className='grid grid-cols-1 gap-12 xl:grid-cols-3'>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaHome className='text-3xl mb-2'></FaHome>
              <h2 className='text-xl font-semibold'> Perfect for Your Home </h2>
              <p className='max-w-lg mx-auto'> Imagine coming home to a wagging tail or a gentle purr. Pets bring warmth, companionship and joy to any household. </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1, delay: 0.2 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaCompass className='text-3xl mb-2'></FaCompass>
              <h2 className='text-xl font-semibold '> Find Your Way </h2>
              <p className='max-w-lg mx-auto'> Set your course towards a lifetime of love and companionship. Explore our listings to find a pet that matches your lifestyle. </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1, delay: 0.4 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaMagic className='text-3xl mb-2'></FaMagic>
              <h2 className='text-xl font-semibold max-w-md mx-auto'> The Magic </h2>
              <p className='max-w-lg mx-auto'> There is a special kind of magic in the bond between pets and their owners. They bring energy and joy into our lives. </p>
            </motion.div>
          </div>

        </div>
      </section>



      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] mb-[50px] relative'>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-24'>

            <motion.div variants={fadeInAnimationFromLeft} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.5 }} className='flex flex-col lg:items-start gap-6'>
              <h1 className='text-2xl font-semibold text-center mb-4'> The Love Pets Bring to Our Life </h1>
              <p className='max-w-md mx-auto text-justify'> 
                Pets have a remarkable ability to enrich our lives with their unique personalities and loyalty. The bond between pets and their owners brings immense
                joy and fulfillment. They offer a love that is pure and unconditional. Pets transform our daily routines into moments of happiness, very often filled
                with laughter. Those moments you share with your pet will become memories that last a lifetime. From playful afternoons to quiet evenings, cuddles on 
                the couch, each day will bring new experiences and joy. Adopting a pet means welcoming a devoted companion not only into our homes, but also our hearts.
              </p>
              
              <Link to={'/faq'} className='px-7 py-3 border border-black mx-auto lg:mx-0 rounded-lg hover:bg-black hover:text-white transition-all duration-500 ease-in-out'>
                FAQ
              </Link>
            </motion.div>

            <motion.div variants={fadeInAnimationFromRight} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.5 }} className='grid grid-cols-3 gap-2'>
              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1625316708582-7c38734be31d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1629740067905-bd3f515aa739?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1607923432735-bb1e676f87a8?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1607923432848-62f872d16daf?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[220px] sm:max-w-[320px] h-[150px] sm:h-[220px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full sm:h-[220px] hover:scale-110 transition-all duration-500'/>
              </div>
            </motion.div>

          </div>
        </div>
      </section>



      <section className='mt-[80px] xl:mt-[160px] py-[80px] xl:py-[120px] relative bg-custom-green'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Routine & Purpose </h3>
              <span className='text-white'> Pets give us routine and a sense of purpose in daily life. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.2 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Stress Relief </h3>
              <span className='text-white'> They help reduce stress and improve overall mental health. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.4 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Active Lifestyle </h3>
              <span className='text-white'> They encourage physical activity and a healthy lifestyle. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.6 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Socialization </h3>
              <span className='text-white'> Pets promote socialization and interaction with others. </span>
            </motion.div>
          </div>
        </div>
      </section>



      { petListings && petListings.length > 0 && (
      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] relative'>
        <div className='container mx-auto'>
          <div className='text-center max-w-[800px] mx-auto'>
            <motion.h3 variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.3}} transition={{ duration: 1 }}  className='text-4xl mb-4'> Check Out Our Latest Posts </motion.h3>
            <motion.p variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.3}} transition={{ duration: 1, delay: 0.3 }}  className='mb-12'> Don't miss out - check out the three newest posts on our site now and find your pefect furry friend today! </motion.p>
          </div>
          <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1 }} className='grid grid-cols-1 xl:grid-cols-3 gap-12'>
            { petListings.map((pet) => (
              <ListingItem listing={pet} key={pet._id} />
            ))}
          </motion.div> 
        </div>
      </section>
       )}



      <motion.section variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1 }} className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] mb-[80px] xl:mb-[160px] relative'>
        <div className='container mx-auto bg-custom-green sm:rounded-[64px]'>
          <div className='p-20 max-w-[640px] mx-auto text-center'>
            <h3 className='text-4xl text-white mb-2'> Haven't signed up yet? </h3>
            <p className='text-xl text-white mb-8'> Your journey starts here, sign up now to find your pet! </p>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1, delay:0.3 }}>
              <Link to={"/sign-up"} className='text-white p-3 border rounded-lg hover:bg-white hover:text-custom-green transition-all duration-500 ease-in-out'>
                Sign up
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>


    </main>
  )
}
