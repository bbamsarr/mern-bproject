import React from 'react'
import { FaDog, FaCat, FaHome, FaHeart } from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className='py-24 px-3 max-w-6xl mx-auto'>
      <div className='flex flex-col lg:flex-row items-center gap-8'>
        <div className='flex flex-col gap-6 w-2/3'>
          <h1 className='text-3xl sm:text-5xl font-semibold text-custom-text-color'> Our mission </h1>
          <p className='text-justify'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
          <div className='border-t-4'></div>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaDog></FaDog>
                </div>
                <p className='text-justify'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore
                  et dolore magna aliqua. 
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaHeart></FaHeart>
                </div>
                <p className='text-justify'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore
                  et dolore magna aliqua. 
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaHome></FaHome>
              </div>
              <p className='text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore
                et dolore magna aliqua. 
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaCat></FaCat>
              </div>
              <p className='text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi dunt ut labore
                et dolore magna aliqua.
              </p>
            </div>
            </div>
          </div>
        </div>

        
        <div className='w-1/2 lg:w-1/3  lg:h-[400px]'>
          <img src="https://media.istockphoto.com/id/1303553390/photo/cute-funny-whippet-dog-lying-on-wooden-floor-near-various-plush-toy-dogs-adult-animals-and.jpg?s=612x612&w=0&k=20&c=NQdgT1GGX4sqsiMFL0ry26euLHX4v75yyI4ecPFvZjE=" alt="image" className='rounded-lg shadow-lg object-fill w-full h-full'/>
        </div>
      </div>

    </div>
    
  )
}
