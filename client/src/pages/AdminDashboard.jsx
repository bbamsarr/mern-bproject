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
    <div className='sm:mx-auto flex flex-col md:flex-row h-screen bg-gray-100'>
        <div className='w-full md:w-1/5 bg-slate-700 p-5'>
            <ul className=''>
                <li>
                    <button onClick={()=>setActiveTab('users')} className='flex items-center space-x-4 text-white text-xl'>
                        <FaUsers> </FaUsers>
                        <span> Users </span>
                    </button>
                </li>
                <li>
                    <button onClick={()=>setActiveTab('pets')} className='flex items-center space-x-4 text-white text-xl'>
                        <FaFile></FaFile>
                        <span> Pets </span>
                    </button>
                </li>
            </ul>
        </div>


        <div>
            { activeTab === 'users' && (
                <div className='p-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 mb-10 p-4'>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUsers className='text-3xl text-custom-darkblue'> </FaUsers>
                            <span className='text-xl'> Total users </span>
                            <span className='text-2xl'> {totalUsers} </span>
                        </div>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> New last month </span>
                            <span className='text-2xl'> {newUsersLastMonth} </span>
                        </div>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> New this month </span>
                            <span className='text-2xl'> {newUsersThisMonth} </span>
                        </div>
                    </div>
                    <div className='table-auto overflow-x-scroll overflow-y-auto'> 
                        {users.length > 0 && (
                        <table className='border-2 rounded-lg shadow-lg'>
                            <thead>
                                <tr className='bg-gray-200 border-b-2 border-gray-200'>
                                    <th className='px-3 py-3'> Profile Image </th>
                                    <th className='px-3 py-3'> Username </th>
                                    <th className='px-3 py-3'> Email </th>
                                    <th className='px-3 py-3'> Date created </th>
                                    <th className='px-3 py-3'> Delete user </th>
                                </tr>
                            </thead>
                            <tbody>
                            { users.map((user) => (
                                <tr key={user._id} className='hover:bg-gray-50 border-b border-gray-200'>
                                    <td className='px-10 py-3'>
                                        <img src={user.avatar} alt='profileImage' className='min-w-[40px] min-h-[40px] w-10 h-10 object-cover rounded-full shadow-md'/>
                                    </td>
                                    <td className='px-3 py-3' >
                                        {user.username}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {user.email}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='px-3 py-3'>
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteUser} title="Delete Confirmation" message="Are you sure you want to delete this user?"/>
        </div>



        
        <div>
            { activeTab === 'pets' && (
                <div className='p-4'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 mb-10 p-4'>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUsers className='text-3xl text-custom-darkblue'> </FaUsers>
                            <span className='text-xl'> Total pets </span>
                            <span className='text-2xl'> {totalListings} </span>
                        </div>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> For Adoption </span>
                            <span className='text-2xl'> {listingsForAdoption} </span>
                        </div>
                        <div className='w-full sm:w-1/3 flex flex-col items-center border-2 p-4 rounded-lg shadow-lg'>
                            <FaUserPlus className='text-3xl text-custom-darkblue'> </FaUserPlus>
                            <span className='text-xl'> Adopted </span>
                            <span className='text-2xl'> {adoptedListings} </span>
                        </div>
                    </div>
                    <div className='table-auto overflow-x-scroll overflow-y-scroll'> 
                        {listings.length > 0 && (
                        <table className='border-2 rounded-lg shadow-lg'>
                            <thead>
                                <tr className='bg-gray-200 border-b-2 border-gray-200'>
                                    <th className='px-3 py-3'> Image </th>
                                    <th className='px-3 py-3'> Name </th>
                                    <th className='px-3 py-3'> Species </th>
                                    <th className='px-3 py-3'> Breed </th>
                                    <th className='px-3 py-3'> Age </th>
                                    <th className='px-3 py-3'> Size </th>
                                    <th className='px-3 py-3'> Gender </th>
                                    <th className='px-3 py-3'> Vaccinated </th>
                                    <th className='px-3 py-3'> Status </th>
                                    <th className='px-3 py-3'> Delete </th>
                                </tr>
                            </thead>
                            <tbody>
                            { listings.map((listing) => (
                                <tr key={listing._id} className='hover:bg-gray-50 border-b border-gray-200'>
                                    <td className='px-10 py-3'>
                                        <Link to={`/listing/${listing._id}`}>
                                            <img src={listing.imageUrls[0]} alt='profileImage' className='min-w-[40px] min-h-[40px] w-10 h-10 object-cover rounded-full shadow-md'/>
                                        </Link>
                                    </td>
                                    <td className='px-3 py-3' >
                                        {listing.name}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.species}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.breed}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.age}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.size}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.gender}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.vaccinated ? 'Yes' : 'No'}
                                    </td>
                                    <td className='px-3 py-3'>
                                        {listing.status}
                                    </td>
                                    <td className='px-3 py-3'>
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteListing} title="Delete Confirmation" message="Are you sure you want to delete this user?"/>
        </div>



        
    </div>
  )
}
