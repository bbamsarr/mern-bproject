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
          <h1 className='text-3xl sm:text-5xl font-semibold text-custom-text-color'> Naša misija </h1>
          <p className='text-justify'>
            Ljubimci nam pružaju bezuslovnu ljubav, druženje i beskrajne trenutke radosti. Međutim, mnogi ljubimci se nađu napušteni ili u azilima, čekajući 
            nekoga da im pruži šansu i nov život. Naš cilj i misija je da olakšamo ovim ljubimcima da pronađu svoj dom pun ljubavi. Verujemo da svaki ljubimac 
            zaslužuje sigurno, brižno okruženje gde može napredovati i donositi radost svojim vlasnicima.
          </p>
          <div className='border-t-4'></div>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaDog></FaDog>
                </div>
                <p className='text-justify'>
                  Pružamo jednostavnu i pristupačnu platformu gde potencijalni vlasnici ljubimaca mogu pretraživati ljubimce za usvajanje. Naš intuitivni interfejs olakšava
                  brzo pronalaženje savršenog ljubimca.
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                  <FaHeart></FaHeart>
                </div>
                <p className='text-justify'>
                  Pružamo informacije i savete o nezi ljubimaca, osiguravajući odgovorno vlasništvo kako bismo novim vlasnicima pomogli da se pripreme i uživaju
                  u životu sa svojim novim ljubimcem.
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaHome></FaHome>
              </div>
              <p className='text-justify'>
                Verujemo u dobrotu i poštovanje prema svim životinjama, zalažemo se za njihovu dobrobit i sreću. Naša posvećenost brizi osigurava da svaki ljubimac
                dobije ljubav koju zaslužuje.
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <div className="text-white text-3xl w-16 h-16 bg-custom-contrast-color shadow-lg rounded-full flex items-center justify-center">
                <FaCat></FaCat>
              </div>
              <p className='text-justify'>
                Sarađujemo sa skloništima i organizacijama za spasavanje kako bismo značajno povećali vidljivost ljubmaca koji traže svoj stalni dom. Zajedno 
                možemo napraviti razliku.
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
