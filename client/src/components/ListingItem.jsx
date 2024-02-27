import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='shadow-md hover:shadow-lg hover:bg-custom-dark-beige transition-shadow overflow-hidden rounded-r-[64px] w-full max-w-[380px] h-[520px] border-2 p-6 mx-auto xl:mx-0'> 
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0] || 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-pet-icon-pack-image_2290227.jpg'} alt="listing cover" className='rounded-r-[64px] h-[320px] w-full object-cover hover:scale-105 transition-scale duration-300'/>

            <div className='pt-4 flex flex-col gap-2 w-full'>
                <p className='truncate tracking-wide text-lg font-semibold'> {listing.name} </p>
                <div className='flex items-center gap-2'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm w-full truncate'> {listing.location} </p>
                </div>
                <p className='text-sm mt-2 line-clamp-2'> {listing.description} </p>
            </div>
        </Link>
    </div>
  )
}
