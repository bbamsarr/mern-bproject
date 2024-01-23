import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'> 
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0] || 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-pet-icon-pack-image_2290227.jpg'} alt="listing cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>

            <div className='p-4 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'> {listing.name} </p>
                <div className='flex items-center gap-2'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-700 w-full truncate'> {listing.location} </p>
                </div>
                <p className='text-sm text-gray-700 mt-2 line-clamp-2'> {listing.description} </p>
            </div>
        </Link>
        
    </div>
  )
}
