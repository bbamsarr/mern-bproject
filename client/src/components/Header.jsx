import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);


    {/*
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Web</span>
                    <span className='text-slate-700'>APP</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center' onSubmit={handleSubmit}>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search for a pet...'  className='bg-transparent focus:outline-none w-24 sm:w-64' />
                <button> 
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>

            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>

                <Link to='/profile'>
                    { currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover' src = {currentUser.avatar} alt='profile' />
                    ) : (
                        <li className='text-slate-700 hover:underline'>Sign in</li> 
                    )}
                </Link>

                  

            </ul>
        </div>
    </header>
    ) */}


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    {/* OVO MORA DA SE PROVERI I ISPITA VISE PUTA - NEMAM POJMA KAKO RADI ALI RADI */}
    return (
        <header className='bg-custom-lightblue shadow-lg'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap'>
                        <span className='text-custom-darkblue'>Pet</span>
                        <span className='text-custom-orange'>Adopt</span>
                    </h1>
                </Link>
        
                <form className='bg-custom-beige p-3 rounded-lg flex items-center' onSubmit={handleSubmit}>
                    <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search for a pet...'  className='bg-transparent focus:outline-none w-32 sm:w-72' />
                    <button> 
                        <FaSearch className='text-custom-darkblue'/>
                    </button>
                </form>
            

                {/* Hamburger menu button */}
                <button
                onClick={toggleMenu}
                className='lg:hidden text-custom-darkblue hover:text-slate-900 focus:outline-none'
                >
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                    ></path>
                </svg>
                </button>

                {/* Sidebar for the menu */}
                <nav
                    className={`lg:flex lg:flex-row fixed inset-y-0 right-0 z-50 bg-custom-lightblue lg:bg-transparent p-5 transform ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    } lg:translate-x-0 lg:static lg:inset-auto lg:ml-0 lg:visible lg:w-auto lg:p-0 transition-transform ease-in-out duration-300 lg:shadow-none lg:border-none shadow-lg border-l-1 border-[#9da9a7]`}
                    >
                    
                    <button onClick={toggleMenu} className='lg:hidden ml-auto flex items-center'> X </button>
                    
                    <Link to='/'>
                        <div className='text-custom-darkblue hover:underline p-2'>Home</div>
                    </Link>
                    <Link to='/about'>
                        <div className='text-custom-darkblue hover:underline p-2'>About</div>
                    </Link>
                    <Link to='/information'>
                        <div className='text-custom-darkblue hover:underline p-2'>Information</div>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                        <img
                            className='rounded-full h-7 w-7 object-cover m-2'
                            src={currentUser.avatar}
                            alt='profile'
                        />
                        ) : (
                        <div className='text-custom-darkblue hover:underline p-2'>Sign in</div>
                        )}
                    </Link>
                </nav>

            </div>
        </header>
        ) 
}
