import React, { useEffect, useState } from 'react';
import { FaUsers, FaFile, FaTrash, FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const {currentUser} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [newUsersLastMonth, setNewUsersLastMonth] = useState(0);
    const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
    const [deleteUserID, setDeleteUserID] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listings, setListings] = useState([]);
    const [totalListings, setTotalListings] = useState(0);
    const [deleteListingID, setDeleteListingID] = useState('');
    const [listingsForAdoption, setListingsForAdoption] = useState(0);
    const [adoptedListings, setAdoptedListings] = useState(0);
    
    useEffect(()=> {
        const fetchUsers = async () => {
            try{
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setNewUsersLastMonth(data.newUsersLastMonth);
                    setNewUsersThisMonth(data.newUsersThisMonth);
                }
            } catch(error) {
                console.log(error.message);
            }
        };

        const fetchListings = async () => {
            try{
                const res = await fetch(`/api/listing/getalllistings`);
                const data = await res.json();
                if (res.ok) {
                    setListings(data.listings);
                    setTotalListings(data.totalListings);
                    setListingsForAdoption(data.listingsForAdoption);
                    setAdoptedListings(data.adoptedListings);
                    console.log(data);
                }
            } catch(error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
            fetchListings();
        }
    }, [currentUser._id]);
    

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${deleteUserID}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== deleteUserID));
                setTotalUsers(prevTotalUsers => prevTotalUsers - 1);
                setIsModalOpen(false);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

        
    const handleDeleteListing = async () => {
        try {
            const res = await fetch(`/api/listing/delete/${deleteListingID}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setListings((prev) => prev.filter((listing) => listing._id !== deleteListingID));
                setTotalListings(prevTotalListings => prevTotalListings - 1);
                setIsModalOpen(false);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

  return (
    <div className='min-h-screen flex flex-col md:flex-row  bg-gray-100'>
        <div className='w-full md:w-64 bg-custom-contrast-color p-6'>
            <ul className='flex flex-col gap-4'>
                <li>
                    <button onClick={()=>setActiveTab('users')} className='flex items-center gap-2 text-white text-xl'>
                        <FaUsers> </FaUsers>
                        <span> Users </span>
                    </button>
                </li>
                <li>
                    <button onClick={()=>setActiveTab('pets')} className='flex items-center gap-2 text-white text-xl'>
                        <FaFile></FaFile>
                        <span> Pets </span>
                    </button>
                </li>
            </ul>
        </div>
        
        { activeTab === 'users' && (
            <div className='sm:mx-auto xl:-translate-x-[64px] mt-20 mb-20'>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 p-8'>
                        <div className='w-full flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUsers className='text-3xl text-custom-darkblue'> </FaUsers>
                            <span className='text-xl'> Total users </span>
                            <span className='text-2xl'> {totalUsers} </span>
                        </div>
                        <div className='w-full flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> + last month </span>
                            <span className='text-2xl'> {newUsersLastMonth} </span>
                        </div>
                        <div className='w-full  flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> + this month </span>
                            <span className='text-2xl'> {newUsersThisMonth} </span>
                        </div>
                    </div>
                    <div className='table-auto overflow-auto md:mx-auto'> 
                        {users.length > 0 && (
                        <table className='w-full rounded-lg shadow-lg'>
                            <thead>
                                <tr className='bg-gray-200 border-b-2 border-gray-200'>
                                    <th className='p-3 text-center'> Profile Image </th>
                                    <th className='p-3 text-left'> Username </th>
                                    <th className='p-3 text-left'> Email </th>
                                    <th className='p-3 text-left'> Date created </th>
                                    <th className='p-3 text-left'> Delete user </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y'>
                            { users.map((user) => (
                                <tr key={user._id} className='hover:bg-gray-50 border-b border-gray-200'>
                                    <td className='px-10 py-3'>
                                        <img src={user.avatar} alt='profileImage' className='min-w-[40px] min-h-[40px] w-10 h-10 object-cover rounded-full shadow-md'/>
                                    </td>
                                    <td className='p-3' >
                                        {user.username}
                                    </td>
                                    <td className='p-3'>
                                        {user.email}
                                    </td>
                                    <td className='p-3'>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='p-3'>
                                        <span className='cursor-pointer text-red-500 hover:text-red-700' onClick={() => { setIsModalOpen(true); setDeleteUserID(user._id);}}> Delete </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        )}
                    </div>
            </div>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteUser} title="Delete Confirmation" message="Are you sure you want to delete this?"/>
        



        
        
        { activeTab === 'pets' && (
                <div className='sm:mx-auto xl:-translate-x-[64px] mt-20 mb-20'>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 p-8'>
                        <div className='w-full flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUsers className='text-3xl text-custom-darkblue'> </FaUsers>
                            <span className='text-xl'> Total pets </span>
                            <span className='text-2xl'> {totalListings} </span>
                        </div>
                        {/** 
                        <div className='w-full flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> For Adoption </span>
                            <span className='text-2xl'> {listingsForAdoption} </span>
                        </div>
                        <div className='w-full flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> Adopted </span>
                            <span className='text-2xl'> {adoptedListings} </span>
                        </div> */}
                    </div>
                    <div className='table-auto overflow-auto lg:mx-auto'>
                        {listings.length > 0 && (
                            <table className='w-full rounded-lg shadow-lg'>
                                <thead>
                                    <tr className='bg-gray-200 border-b-2 border-gray-200'>
                                        <th className='p-3 text-center'> Image </th>
                                        <th className='p-3 text-left'> Name </th>
                                        <th className='p-3 text-left'> Species </th>
                                        <th className='p-3 text-left'> Breed </th>
                                        <th className='p-3 text-left'> Age </th>
                                        <th className='p-3 text-left'> Delete </th>
                                    </tr>
                                </thead>
                                <tbody className='divided-y'>
                                { listings.map((listing) => (
                                    <tr key={listing._id} className='hover:bg-gray-50 border-b border-gray-200'>
                                        <td className='px-10 py-3'>
                                            <Link to={`/listing/${listing._id}`}>
                                                <img src={listing.imageUrls[0]} alt='profileImage' className='min-w-[40px] min-h-[40px] w-10 h-10 object-cover rounded-full shadow-md'/>
                                            </Link>
                                        </td>
                                        <td className='p-3' >
                                            {listing.name}
                                        </td>
                                        <td className='p-3'>
                                            {listing.species}
                                        </td>
                                        <td className='p-3'>
                                            {listing.breed}
                                        </td>
                                        <td className='p-3'>
                                            {listing.age}
                                        </td>
                                        <td className='p-3'>
                                            <span className='cursor-pointer text-red-500 hover:text-red-700' onClick={() => { setIsModalOpen(true); setDeleteListingID(listing._id);}}> Delete </span>
                                        </td>
                                    </tr>       
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteListing} title="Delete Confirmation" message="Are you sure you want to delete this?"/>
       



        
    </div>
  )
}
