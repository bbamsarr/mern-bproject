import React from 'react'
import { FaDog, FaCat, FaHome, FaHeart } from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';

const fadeInAnimationFromTop = {
  initial: { opacity: 0, y: -75 },
  visible: { opacity: 1, y: 0 },
};

const fadeInAnimationFromBottom = {
  initial: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className='py-24 px-3 max-w-6xl mx-auto mb-[80px] xl:mb-[160px]'>
      <div className='flex flex-col lg:flex-row items-center gap-8'>
        <motion.div variants={fadeInAnimationFromTop} initial="initial" animate="visible" transition={{duration:1}} className='flex flex-col gap-6 w-full lg:w-2/3'>
          <h1 className='text-3xl sm:text-5xl font-semibold text-custom-text-color'> Our mission </h1>
          <p className='text-justify'>
            Pets offer us unconditional love, companionship and endless moments of joy. However, many pets find themselves abandoned or in shelters, waiting 
            for someone to give them a chance. Our goal and mission is to make it easier for these pets to find their loving home. We believe that every pet 
            deserves a safe, caring environment where they can thrive and bring joy to their owners.
          </p>
          <div className='border-t-4'></div>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaDog></FaDog>
                </div>
                <p className='text-justify'>
                  We provide an easy-to-use platform where potentional pet owners can search for adoptable pets. Our intuitive interface makes it simple to 
                  find the perfect pet.
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaHeart></FaHeart>
                </div>
                <p className='text-justify'>
                  We offer information and guidance on pet care, ensuring responsible pet ownership to help new pet owners prepare for and enjoy life with their
                  new friend.
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaHome></FaHome>
              </div>
              <p className='text-justify'>
                We believe in treating all animals with kindness and respect, advocating for their well-being and happiness. Our commitment to care ensures every 
                pet receives love they deserve.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaCat></FaCat>
              </div>
              <p className='text-justify'>
                We collaborate with shelters and rescue organizations to increase the visibility of pets in need of finding their forever homes. By working together,
                we make a difference.
              </p>
            </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div variants={fadeInAnimationFromBottom} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1 }} className='w-1/2 lg:w-1/3  lg:h-[400px]'>
          <img src="https://media.istockphoto.com/id/1303553390/photo/cute-funny-whippet-dog-lying-on-wooden-floor-near-various-plush-toy-dogs-adult-animals-and.jpg?s=612x612&w=0&k=20&c=NQdgT1GGX4sqsiMFL0ry26euLHX4v75yyI4ecPFvZjE=" alt="image" className='rounded-lg shadow-lg object-fill w-full h-full'/>
        </motion.div>
      </div>

    </div>
    
  )
}
