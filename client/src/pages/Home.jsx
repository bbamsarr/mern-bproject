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
              <h1 className='text-4xl xl:text-6xl font-semibold tracking-widest text-white mb-8'> Dobrodošli u PetAdopt!</h1>
              <span className='text-white mb-4'> U PetAdopt-u, verujemo da svaki ljubimac zaslužuje dom pun ljubavi. Bilo da tražite razigrano štene, mače ili starijeg ljubimca, ovde ćete pronaći savršenog prijatelja! </span>
              <Link to={'/search'} className='mx-auto xl:mx-0 text-white border border-white p-3 rounded-lg hover:bg-white hover:text-black transition-all duration-500 ease-in-out'> Pretraži ljubimce </Link>
            </motion.div>
          </div>
      </section>
  


      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] relative'>
        <div className='container mx-auto'> 
          <div className='grid grid-cols-1 gap-12 xl:grid-cols-3'>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaHome className='text-3xl mb-2'></FaHome>
              <h2 className='text-xl font-semibold'> Savršen za Vaš dom </h2>
              <p className='max-w-lg mx-auto'> Zamislite da se vraćate kući i dočekuje Vas mašući rep ili nežno predenje. Ljubimci donose toplinu, društvo i radost u svaki dom.  </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1, delay: 0.2 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaCompass className='text-3xl mb-2'></FaCompass>
              <h2 className='text-xl font-semibold '> Pronađite svoj put </h2>
              <p className='max-w-lg mx-auto'> Krenite ka životu punom ljubavi i toplog druženja. Pregledajte naše oglase i pronađite ljubimca koji odgovara Vašem stilu života. </p>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1.1, delay: 0.4 }} className='flex flex-col items-center gap-2 text-center'> 
              <FaMagic className='text-3xl mb-2'></FaMagic>
              <h2 className='text-xl font-semibold max-w-md mx-auto'> Čarolija </h2>
              <p className='max-w-lg mx-auto'> Postoji posebna čarolija u vezi između ljubimca i njihovih vlasnika. Oni unose pozitivnu energiju i radost u naše živote. </p>
            </motion.div>
          </div>

        </div>
      </section>



      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] mb-[50px] relative'>
        <div className='container mx-auto'>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-24'>

            <motion.div variants={fadeInAnimationFromLeft} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.5 }} className='flex flex-col lg:items-start gap-6'>
              <h1 className='text-2xl font-semibold text-center mb-4'> Ljubav koju ljubimci donose u naš život </h1>
              <p className='max-w-md mx-auto text-justify'> 
                Ljubimci imaju izuzetnu sposobnost da obogate naše živote svojim jedinstvenim ličnostima i lojalnošću. Veza između ljubimaca i njihovih vlasnika donosi
                neizmernu radost i ispunjenje. Oni pružaju ljubav koja je iskrena i bezuslovna. Ljubimci pretvaraju naše svakodnevne rutine u trenutke sreće, često 
                ispunjene smehom. Trenuci koje delite sa svojim ljubimcem postaju uspomene koje traju ceo život. Od razigranih popodneva do mirnih večeri i maženja na 
                kauču, svaki dan donosi nove doživljaje i radost. Usvajanje ljubimca znači dočekivanje vernog prijatelja koji će obogatiti ne samo Vaš dom, već i Vaše srce.
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
              <h3 className='text-4xl mb-6 text-white'> Rutina i svrha </h3>
              <span className='text-white'> Ljubimci nam pružaju rutinu i osećaj svrhe u svakodnevnom životu. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.2 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Smanjenje stresa </h3>
              <span className='text-white'> Oni pomažu u smanjenju stresa i poboljšanju mentalnog zdravlja. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.4 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Aktivan stil života </h3>
              <span className='text-white'> Podstiču nas na fizičku aktivnost i zdrav način života. </span>
            </motion.div>

            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.5}} transition={{ duration: 1.2, delay: 0.6 }} className='text-center xl:border-r border-white'>
              <h3 className='text-4xl mb-6 text-white'> Socijalizacija </h3>
              <span className='text-white'> Ljubimci podstiču druženje i interakciju sa drugima. </span>
            </motion.div>
          </div>
        </div>
      </section>



      { petListings && petListings.length > 0 && (
      <section className='max-w-6xl mx-auto mt-[80px] xl:mt-[160px] relative'>
        <div className='container mx-auto'>
          <div className='text-center max-w-[800px] mx-auto'>
            <motion.h3 variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.3}} transition={{ duration: 1 }}  className='text-4xl mb-4'> Pogledajte naše najnovije objave </motion.h3>
            <motion.p variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.3}} transition={{ duration: 1, delay: 0.3 }}  className='mb-12'> Ne propustite priliku - pogledajte tri najnovije objave na našem sajtu i pronađite svog savršenog krznenog prijatelja već danas! </motion.p>
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
            <h3 className='text-4xl text-white mb-2'> Još nemate nalog? </h3>
            <p className='text-xl text-white mb-8'> Vaše putovanje počinje ovde, prijavite se sada i pronađite svog ljubimca! </p>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1, delay:0.3 }}>
              <Link to={"/sign-up"} className='text-white p-3 border rounded-lg hover:bg-white hover:text-custom-green transition-all duration-500 ease-in-out'>
                Registrujte se
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>


    </main>
  )
}
