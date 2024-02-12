import React from 'react';
import { FaDog, FaCat, FaFish, FaDove, FaHeart, FaHome, FaPaw } from 'react-icons/fa'

export default function Information() {
  return (
    <div className='py-24 px-3 max-w-6xl mx-auto'>
      <div className='flex flex-col gap-6'>

        {/* treci div - naslov slika tekst */}
        <div className='flex flex-col sm:flex-row items-center gap-8 '>
          <div className='flex-1 flex flex-col items-center gap-4'>
              <FaPaw className='text-5xl text-custom-orange'></FaPaw>
              <h3 className='text-center text-semibold text-3xl'> How to take care of your pet </h3>
          </div>

          <div className='flex-1'>
            <img src="https://www.akc.org/wp-content/uploads/2021/07/Cavalier-King-Charles-Spaniel-laying-down-indoors.jpeg" alt="image" className='rounded-lg shadow-lg h-[220px] sm:h-[320px] w-[320px] sm:w-[420px] object-cover'/>
          </div>

          <div className='flex-1'>
            <p className='text-justify'>
              The best way to ensure that your pet gets the exercise they need is to make sure that they get enough
              activity throughout the day. This can mean giving your pet toys and playing with them throughout the 
              day, or it can mean getting a pet-sitter.
            </p>
          </div>
        </div>

        {/* ovo je prvi div  tekst levo slika desno 
        <div className='flex flex-col sm:flex-row items-center gap-8'>
          <div className='flex-1 flex flex-col gap-4'>
            <h1 className='flex flex-col font-semibold'>
              <span className='text-custom-darkblue text-xl sm:text-3xl'> Welcome to the </span>
              <span className='text-custom-orange text-3xl sm:text-5xl'> Pet Care Guide </span>
            </h1>
            <p className='text-justify'> Owning a pet is a rewarding experience that brings joy and companionship into your life.
              However, it's essential to understand that pets rely on their owners for their well-being.
              This guide aims to provide you with essential information on how to take care of your pet 
              and ensure they live a healthy and happy life.
            </p>
          </div>

          <div className='flex-1'>
            <img src="https://www.shutterstock.com/image-photo/puppy-kittens-sleeping-600nw-205417123.jpg" alt="CatsAndDogs" className='rounded-lg h-[300px] w-[400px] object-contain'/>
          </div>
        </div> */}

        {/* drugi div */}
        <div className='flex flex-col gap-8 sm:gap-16 '>
          <div className='flex flex-col sm:flex-row gap-8'>
            <div>
              <h1 className='font-semibold text-3xl text-center'> #01 </h1>
              <h1 className='font-semibold text-2xl text-center'> Training </h1>
              <p className='text-justify mt-2'> The best way to ensure that your pet gets the exercise they need is to make sure
                that they  get enough activity throughout the day. This can mean giving your pet 
                toys and playing with them throughout the day, or it can mean getting a pet-sitter
                so that you can be sure your pet gets the exercise and company they need while you
                are out.
              </p>
            </div> 

            <div>
              <h1 className='font-semibold text-3xl text-center'> #02 </h1>
              <h1 className='font-semibold text-2xl text-center'> Training </h1>
              <p className='text-justify mt-2'> The best way to ensure that your pet gets the exercise they need is to make sure
                that they  get enough activity throughout the day. This can mean giving your pet 
                toys and playing with them throughout the day, or it can mean getting a pet-sitter
                so that you can be sure your pet gets the exercise and company they need while you
                are out.
              </p>
            </div> 
          </div>

          <div className='flex flex-col sm:flex-row gap-8'>
            <div>
              <h1 className='font-semibold text-3xl text-center'> #03 </h1>
              <h1 className='font-semibold text-2xl text-center'> Training </h1>
              <p className='text-justify mt-2'> The best way to ensure that your pet gets the exercise they need is to make sure
                that they  get enough activity throughout the day. This can mean giving your pet 
                toys and playing with them throughout the day, or it can mean getting a pet-sitter
                so that you can be sure your pet gets the exercise and company they need while you
                are out.
              </p>
            </div> 

            <div>
              <h1 className='font-semibold text-3xl text-center'> #04 </h1>
              <h1 className='font-semibold text-2xl text-center'> Training </h1>
              <p className='text-justify mt-2'> The best way to ensure that your pet gets the exercise they need is to make sure
                that they  get enough activity throughout the day. This can mean giving your pet 
                toys and playing with them throughout the day, or it can mean getting a pet-sitter
                so that you can be sure your pet gets the exercise and company they need while you
                are out.
              </p>
            </div> 
          </div>
        </div>



      </div>
    </div>

   
  )
}
