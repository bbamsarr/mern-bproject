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
              <h1 className='text-4xl xl:text-6xl font-semibold text-custom-text-color'> Pravilna briga o ljubimcima </h1>
              <div className='border-2 w-full'> </div>
              <p className='p-2'>
                Briga o Vašem ljubimcu je ključna za njihovo zdravlje, sreću i opšte blagostanje. Pravilna ishrana, redovna fizička aktivnost,
                rutinske posete veterinaru, sprečavaju bolesti i produžavaju životni vek ljubimca. Mentalna stimulacija, kao i socijalizacija
                sa drugim ljudima i ljubimcima, pomažu im da se dobro prilagode okolini, smanjuju njihovu anksioznost i agresiju, i sprečavaju
                probleme u ponašanju. Da biste obezbedili da Vaši ljubimci vode zdrav i srećan život, morate se dobro brinuti o njima.
              </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.2, delay: 0.4 }} className='grid grid-col-1 sm:grid-cols-3 gap-4'>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1528301725143-1ba694832e77?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Fizička aktivnost </h3>
                <p className='text-center'>
                  Redovna vežba poboljšava zdravlje kostiju, zglobova, mišića i organa. Takođe, šetnja može ukloniti dosadu i pružiti mentalnu stimulaciu.
                  Usvojite rutinu vežbanja sa Vašim ljubimcem.
                </p>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1533514114760-4389f572ae26?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>

              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Pravilna ishrana </h3>
                <p className='text-center'>
                  Izbalansirana ishrana, bogata raznovrsnim i kvalitetnim namirnicama, osigurava sve neophodne hranljive materije za njihov rast, 
                  energiju i opšte zdravlje.
                </p>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] overflow-hidden'>
                <img src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='' className='h-full w-full object-cover sm:h-[270px] hover:scale-110 transition-all duration-500'/>
              </div>
              <div className='max-w-[270px] sm:max-w-[320px] h-[250px] sm:h-[270px] flex flex-col items-center justify-center border-2 p-2'>
                <h3 className='text-xl font-semibold mb-4'> Dresura i socijalizacija </h3>
                <p className='text-center'>
                  Dresirajte svog ljubimca osnovnim komandama i manirima postepeno, kako bi imao dovoljno vremena da ih savlada. Pružajte mu mnogo
                  pažnje i nagrada za svaki uspešan odgovor.
                </p>
              </div>
            </motion.div>


          </div>

        </div>
      </section>

    </div>
  )
}
