import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaHome, FaMapMarkedAlt, FaMapMarkerAlt, FaMars, FaPaw, FaSyringe, FaVenus } from 'react-icons/fa';
import AdoptionModal from '../components/AdoptionModal';
export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =  useState(false);
    const {currentUser} = useSelector((state) => state.user);
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
    const params = useParams();


    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            }
            catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

  

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'> Loading... </p>}
        {error && <p className='text-center my-7 text-2xl'> Oops, something went wrong... </p>}
        {listing && !loading && !error && (
            <div className='max-w-6xl mx-auto'>
                <Swiper modules={[Pagination, EffectCoverflow, Autoplay]} 
                    effect='coverflow' 
                    grabCursor={true} 
                    pagination={true}
                    centeredSlides={true}
                    autoplay={{
                    delay: 5000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    breakpoints={{
                        680: {
                            slidesPerView: '3',
                        },
                        0: {
                            slidesPerView: '1',
                        },
                    }}
                    className='bg-custom-bg-color'>
                    {listing.imageUrls.map((url) => (
                        <SwiperSlide key={url}>
                            <div className='h-[500px] bg-center bg-no-repeat bg-cover' style={{backgroundImage: `url(${url})`}}>
                            </div>
                        </SwiperSlide>
                    )
                    )}
                </Swiper>


                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 mb-[80px] xl:mb-[160px]'>
                    <p className='text-3xl font-semibold'>
                        {listing.species} - {listing.name}
                    </p>
                    <p className='flex items-center mt-5 gap-2 text-slate-600  text-lg'>
                        <FaMapMarkerAlt className='text-green-700' />
                        {listing.location}
                    </p>

                    {/** 
                    <div className=''>
                        <p className='bg-red-700 w-full max-w-[200px] text-white text-center p-2 rounded-md'>
                            Adopt
                        </p>
                    </div>*/}

                    <p className='text-slate-800'>
                        <span className='font-semibold text-black'>
                            Description: {' '}
                        </span>
                        {listing.description} 
                    </p>

                    <ul className='flex flex-wrap items-center gap-4 sm:gap-6 text-green-800 font-semibold text-sm'>
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaPaw className='text-lg'/>
                            {listing.species} - {listing.breed}
                        </li>

                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            {listing.gender === 'male' ? (
                                <>
                                    <FaMars className='text-lg'/>
                                    <span> Male </span>
                                </>
                            ) : (
                                <>
                                    <FaVenus className='text-lg'/>
                                    <span> Female </span>
                                </>
                            )
                            }
                        </li>

                
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaSyringe className='text-lg'/>
                            {listing.vaccinated ? 'Vaccinated' : 'Not vaccinated'} 
                        </li>

                        {listing.houseTrained && (
                            <li className='flex items-center gap-2 whitespace-nowrap'>
                                <FaHome className='text-lg'/>
                                <span> House-trained</span>
                            </li>
                        )}
                        

                    </ul> 
                    {currentUser && listing.userRef !== currentUser._id && (
                        <div className=''>
                            <button onClick={()=>setIsAdoptionModalOpen(true)} className='bg-red-700 text-white text-xl hover:opacity-80 rounded-lg px-20 py-2'> Adopt </button>
                            <AdoptionModal isOpen={isAdoptionModalOpen} onClose={()=>setIsAdoptionModalOpen(false)} listing={listing}/>
                        </div>
                    )}
                    
                </div>
            </div>
        )}
    </main>
  )
}
