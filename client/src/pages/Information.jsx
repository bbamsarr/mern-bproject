import React from 'react';
import { FaDog, FaCat, FaFish, FaDove, FaHeart, FaHome, FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

export default function Information() {
  return (
    <div className='max-w-6xl mx-auto mb-[80px] xl:mb-[160px]'>

      <section className='mt-[80px] xl:mt-[100px] relative'>
        <div className='container mx-auto'> 
          <div className='flex flex-col items-center justify-center gap-12 text-center'>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1 }} className='flex flex-col items-center gap-4'>
              <h1 className='text-4xl xl:text-6xl font-semibold text-custom-text-color'> Proper Pet Care </h1>
              <div className='border-2 w-full'> </div>
              <p className='p-2'>
                Taking care of your pet is crucial for ensuring their health, happiness and overall well-being. Proper nutrition,
                regular exercise, routine visits to their veterinarian prevent diseases and extend lifespan. Mental stimulation,
                aswell as socialization with other people and pets, help them become well-adjusted, reduce their anxiety and aggression,
                and prevent behavioral issues. In order to ensure your pets lead a healthy and happy life, you have to take good care of them.
              </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.2, delay: 0.4 }} className='grid grid-col-1 sm:grid-cols-3 gap-4'>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1528301725143-1ba694832e77?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Daily Exercise </h3>
                <p className='text-center'>
                  Regular exercise promotes bone, joint, muscle and organ health. Walking can also eliminate boredom and provide mental stimulation. 
                  Create an exercise routine with your pet. 
                </p>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1533514114760-4389f572ae26?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Nutritious Food </h3>
                <p className='text-center'>
                  A balanced diet ensures your pet receives all the essential nutrients required for growth, energy, and overall health. 
                  Pets need food that is tailored to their individual requirement.
                </p>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Training and Socialization </h3>
                <p className='text-center'>
                  Train your pet with basic commands and manners in small steps so your pet has time to learn them. Give your pet a lot of attention 
                  and rewards for each correct response.
                </p>
              </div>
            </motion.div>


          </div>

        </div>
      </section>

    </div>
  )
}
