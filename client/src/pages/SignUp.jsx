import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';
import { motion } from 'framer-motion';

const fadeInAnimation = {
  initial: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false ) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage:"url('https://img.freepik.com/free-photo/cute-playful-white-braun-doggy-pet-is-playing-looking-happy-isolated-white_155003-27504.jpg?t=st=1709167727~exp=1709171327~hmac=bfb2281d4b1e2e2dce7ce185aecdeae9978b7b2d59dd028d090281c690bc8064&w=1380')", filter: 'blur(8px)'}} >
      </div>

      <motion.div variants={fadeInAnimation} initial="initial" animate="visible" transition={{duration:1}} className='relative p-6 max-w-lg mx-auto rounded-[64px] border-1 m-20 shadow-lg'>
        <h1 className='text-custom-darkblue text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
          <input type='text' placeholder='username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={handleChange} />
          <input type='email' placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange} />
          <input type='password' placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange} />

          <button disabled={loading} className= 'bg-custom-darkblue text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading? 'Loading...' : 'Sign Up'} 
          </button>
          <OAuth/>
        </form>

        <div className='flex gap-2 mt-5 mb-16'>
          <p>Have an account?</p>
          <Link to={'/sign-in'}>
            <span className='text-blue-700'>Sign in</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'> {error} </p>}
      </motion.div>
    </div>
  )
}
