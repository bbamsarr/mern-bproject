import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [petListings, setPetListings ] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(petListings);

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
    <div className='max-w-6xl mx-auto py-24 px-3'>
      <div className='flex flex-col items-center'>
        {/* naslov */}
        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-custom-darkblue text-3xl lg:text-6xl'>
            Find your<span className='text-custom-orange'> furry friend! </span>
          </h1>
          <div className='text-custom-darkblue text-md text-justify'>
            Discover a world of wagging tails, purring companions, and unconditional love. 
            Our app connects you with adorable pets in need of a forever home. Whether you're 
            a dog lover, cat enthusiast, or prefer the company of small critters, your perfect match is just a click away.
          </div>
          <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline mb-5'>
            Start now...
          </Link>
        </div>

        {/* slika */}
        <div className=''>
          <img className="rounded-lg shadow-lg" src="https://firebasestorage.googleapis.com/v0/b/mern-bproject.appspot.com/o/slika%20za%20homepage%20mozda.png?alt=media&token=b2ec644d-2b01-4d56-98d0-893aa861190d" alt="homePageImg"/>
        </div>
        

        {/*  slike 
        <Swiper navigation>
        { petListings && petListings.length > 0 && petListings.map((listing) => (
          <SwiperSlide>
            <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover", }} className='h-[500px]' key={listing._id}>
            </div> 
          </SwiperSlide>
        )
        )}
        </Swiper>*/}

        {/* listings */}
        <div className='flex flex-col gap-8 my-10'>
          {
            petListings && petListings.length > 0 && (
              <div className=''>
                <div className='my-6'>
                  <h2 className='text-custom-darkblue text-2xl font-semibold'>
                    Recent pets
                  </h2>
                  <Link className='text-custom-darkblue text-sm hover:underline' to={'/search'}>
                    Show more...
                  </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    petListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    )
                    )
                  }
                </div>
              </div>
            )
          }

        </div>

    
        
      </div>
    </div>
  )
}
