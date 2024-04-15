import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sideData, setsideData] = useState({
        searchTerm: '',
        breed: '',
        location: '',
        age: '',
        size: '',
        gender: '',
        vaccinated: false,
        houseTrained: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    console.log(sideData);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const breedFromUrl = urlParams.get('breed');
        const locationFromUrl = urlParams.get('location');
        const vaccinatedFromUrl = urlParams.get('vaccinated');
        const houseTrainedFromUrl = urlParams.get('houseTrained');
        const ageFromUrl = urlParams.get('age');
        const sizeFromUrl = urlParams.get('size');
        const genderFromUrl = urlParams.get('gender');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order'); 
        if (searchTermFromUrl || breedFromUrl || locationFromUrl || vaccinatedFromUrl || houseTrainedFromUrl || ageFromUrl || sizeFromUrl || genderFromUrl || sortFromUrl || orderFromUrl) {
            setsideData({ searchTerm: searchTermFromUrl || '', 
                        breed: breedFromUrl || '',
                        location: locationFromUrl || '',
                        vaccinated: vaccinatedFromUrl === 'true' ? true : false,
                        houseTrained: houseTrainedFromUrl === 'true' ? true : false,
                        age: ageFromUrl || '',
                        size: sizeFromUrl || '',
                        gender: genderFromUrl || '',
                        sort: sortFromUrl || 'created_at',
                        order: orderFromUrl || 'desc',
                        });
        }

        const fetchListings = async() => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) 
                setShowMore(true);
            else
                setShowMore(false);
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);


    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setsideData({ ...sideData, searchTerm: e.target.value});
        }
        if (e.target.id === 'breed') {
            setsideData({ ...sideData, breed: e.target.value});
        }
        if (e.target.id === 'location') {
            setsideData({ ...sideData, location: e.target.value});
        }
        if (e.target.id === 'vaccinated') {
            setsideData({ ...sideData, vaccinated: e.target.checked || e.target.checked === 'true' ? true: false});
        }
        if (e.target.id === 'houseTrained') {
            setsideData({ ...sideData, houseTrained: e.target.checked || e.target.checked === 'true' ? true: false});
        }
        if (e.target.id === 'age') {
            setsideData({ ...sideData, age: e.target.value});
        }
        if (e.target.id === 'size') {
            setsideData({ ...sideData, size: e.target.value});
        }
        if (e.target.id === 'gender') {
            setsideData({ ...sideData, gender: e.target.value});
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setsideData({ ...sideData, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideData.searchTerm);
        urlParams.set('breed', sideData.breed);
        urlParams.set('location', sideData.location);
        urlParams.set('vaccinated', sideData.vaccinated);
        urlParams.set('houseTrained', sideData.houseTrained);
        urlParams.set('age', sideData.age);
        urlParams.set('size', sideData.size);
        urlParams.set('gender', sideData.gender);
        urlParams.set('sort', sideData.sort);
        urlParams.set('order', sideData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    };

  return (
    <div className='flex flex-col sm:flex-row'>
        <div className='px-4 py-8 border-b-2 sm:border-r-2 md:min-h-screen min-w-[320px]'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 xl:gap-6'>
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Species </label>
                    <input value={sideData.searchTerm} onChange={handleChange} type="text" id='searchTerm' placeholder='Species...' className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'/>
                </div>

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Breed </label>
                    <input value={sideData.breed} onChange={handleChange} type="text" id='breed' placeholder='Breed...' className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'/>
                </div>

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Location </label>
                    <input value={sideData.location} onChange={handleChange} type="text" id='location' placeholder='Location...' className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'/>
                </div>

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Age </label>
                    <select onChange={handleChange} id='age' defaultValue={''} className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'>
                        <option value=""> Any </option>
                        <option value="young"> Young </option>
                        <option value="adult"> Adult </option>
                        <option value="senior"> Senior </option>
                    </select>
                </div>


                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Size </label>
                    <select onChange={handleChange} id='size' defaultValue={''} className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'>
                        <option value=""> All </option>
                        <option value="small"> Small </option>
                        <option value="medium"> Medium </option>
                        <option value="big"> Big </option>
                    </select>
                </div>

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Gender </label>
                    <select onChange={handleChange} id='gender' defaultValue={''} className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'>
                        <option value=""> All </option>
                        <option value="male"> Male </option>
                        <option value="female"> Female </option>
                    </select>
                </div>

                <div className='flex gap-2 justify-center items-center'>
                    <label className='font-semibold'> Vaccinated: </label>
                    <div className='flex items-center'>
                        <input onChange={handleChange} checked={sideData.vaccinated} type='checkbox' id='vaccinated' className='rounded-lg w-5'/>
                    </div>
                </div>

                
                <div className='flex gap-2 justify-center items-center'>
                    <label className='font-semibold'> House-trained: </label>
                    <div className='flex items-center'>
                        <input onChange={handleChange} checked={sideData.houseTrained} type='checkbox' id='houseTrained' className='rounded-lg w-5'/>
                    </div>
                </div>

                <div className='flex flex-col gap-1 justify-center items-center'>
                    <label className='font-semibold'> Sort by </label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg shadow-sm p-2 w-full focus:outline-none'>
                        <option value='createdAt_desc'> Latest </option> 
                        <option value='createdAt_asc'> Oldest </option>
                    </select>
                </div>

                <button className='bg-custom-contrast-color text-white p-3 rounded-lg shadow-lg uppercase hover:opacity-95'>
                    Search
                </button>

            </form>
        </div>


        <div className='flex-1 mb-[80px] xl:mb-[160px]'>
            <h1 className='text-custom-text-color text-3xl font-semibold p-4 mt-4'> Available pets: </h1>
            <div className='p-8 flex flex-wrap items-center justify-center gap-12'>
                { !loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'> No results found! </p>
                )}
                { loading && (
                    <p className='text-xl text-slate-700 text-center w-full'> Loading... </p>
                )}

                {
                    !loading && listings && listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing}/>
                    ))
                }

                {showMore && (
                    <button  className='text-green-700 hover:underline p-7 text-center w-full' onClick={onShowMoreClick}>
                        Show more
                    </button>
                )}

            </div>
        </div>
    </div>
  )
}
