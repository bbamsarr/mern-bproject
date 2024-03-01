import React from 'react'
import { FaFacebook, FaInstagram, FaPaw, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-custom-footer-color'>

        <div className='flex flex-wrap items-center justify-evenly p-12 gap-4 text-white'>
            <Link to={'/'}>
                <FaPaw className='text-3xl sm:text-5xl text-white'/>
                <h1 className='text-sm sm:text-xl font-semibold'>
                    <span className='text-white'> Web </span>
                    <span className='text-gray-300'> App </span>
                </h1>
            </Link>
           
           <div className='flex flex-wrap gap-6'>
                <Link to={'/'}> Home </Link>

                <Link to={'/about'}> About </Link>

                <Link to={'/faq'}> FAQ </Link>
            </div>
        </div>


        <div className='border w-4/5 my-auto mx-auto'> </div>

        
        <div className='flex flex-col items-center p-10 gap-4 text-white'>
            <ul className='flex text-xl sm:text-3xl gap-8'>
                <li>
                    <a href="https://www.facebook.com" title="Facebook" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                </li>

                <li>
                    <a href="https://www.instagram.com" title="Instagram" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </li>

                <li>
                    <a href="https://www.twitter.com" title="Twitter" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </li>
            </ul>
            <p className='text-center'> © 2024 WebApp. All right reserved. </p>
        </div> 

    </footer>
  )
}
