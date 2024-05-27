import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { FaUser, FaFile, FaPlus, FaUserTie, FaArrowRight } from 'react-icons/fa';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profileSettings');


  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData, avatar: downloadURL });
      })
    }
    );

  };


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      closeModal();
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };


  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };


  const handleListingDelete = async (listingId) => {
    try {
      setDeleteListingError(false);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleteListingError(true);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      setDeleteListingError(true);
      console.log(error.message);
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-custom-bg-color'>
      <div className='w-full md:w-64 bg-custom-contrast-color p-6'>
          <ul className='flex flex-col gap-4'>

              <li>
                  <button onClick={()=> {
                    setActiveTab('pets');
                    handleShowListings()
                  }} 
                  className='flex items-center gap-2 text-white text-lg'>
                      <FaFile></FaFile>
                      <span> Prikaži moje oglase </span>
                  </button>
              </li>
              <li>
                <div className='flex items-center gap-2 text-white text-lg'>
                  <FaPlus></FaPlus>
                  <Link className='' to={"/create-listing"}> Dodaj novi oglas </Link>
                </div>
              </li>

              {/** ovaj deo je za admina */}
              {
                currentUser.isAdmin && (
                  <li>
                    <div className='flex items-center gap-2 text-white text-lg'>
                      <FaUserTie></FaUserTie>
                      <Link to={'/admin-dashboard'}>
                        <button type='button' className=''> Admin dashboard </button>
                      </Link>
                    </div>
                  </li>
                )
              }

              <li>
                  <button onClick={()=>setActiveTab('profileSettings')} className='flex items-center gap-2 text-white text-lg'>
                      <FaUser> </FaUser>
                      <span> Podešavanje profila </span>
                  </button>
              </li>

              <li>
                <button onClick={handleSignout} className='flex items-center gap-2 text-white text-lg'> 
                  <FaArrowRight></FaArrowRight>
                  <span> Odjavite se </span>
                </button>
              </li>

          </ul>
      </div>


      <div className='flex-1 xl:-translate-x-[64px]'>

        { activeTab === 'profileSettings' && (
          <div className='p-3 max-w-xl mx-auto'>
            <h1 className='text-custom-text-color text-3xl font-semibold text-center my-7'> Moj profil </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
              <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
              <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                  
              <p className='text-sm self-center'> 
                {fileUploadError ? 
                  (<span className='text-red-700'> Greška pri učitavanju slike (slika mora biti manja od 2MB ) </span>) : 
                  filePerc > 0 && filePerc < 100 ? (
                    <span className='text-slate-700'> { `Uploading ${filePerc}%` } </span> )
                    :
                    filePerc === 100 ? (
                    <span className='text-green-700'> Slika je uspešno postavljena </span> )
                  :
                  ('')
                }
              </p>
              <label className='font-semibold'>Korisničko ime</label>
              <input type="text" placeholder='Korisničko ime' id='username' className='border p-3 rounded-lg' defaultValue={currentUser.username} onChange={handleChange}/>
              <label className='font-semibold'>Email</label>
              <input type="email" placeholder='Email' id='email' className='border p-3 rounded-lg' defaultValue={currentUser.email} onChange={handleChange}/>
              <label className='font-semibold'>Lozinka</label>
              <input type="password" placeholder='Lozinka' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
          
              <button disabled={loading} className='bg-custom-contrast-color text-white hover:opacity-95 rounded-lg p-3 uppercase disabled:opacity-80'> {loading ? 'Učitavanje...' : 'Ažuriraj profil'} </button>
              
          
            </form>
          
            <div className='flex justify-between mt-5'>
              <span onClick={openModal} className='text-red-700 cursor-pointer hover:underline'> Obrišite nalog </span>
              
              <span onClick={handleSignout} className='text-red-700 cursor-pointer hover:underline'> Odjavite se </span>
            </div>
          
            <p className='text-red-700 mt-5'> {error ? error : '' } </p> 
            <p className='text-green-700 mt-5'> {updateSuccess ? 'Uspešno ažurirano!' : '' } </p>
          </div> 

        )}

        { activeTab === 'pets' && (
          <div className='p-3 max-w-xl mx-auto'>
            
            <p className='text-red-700 mt-5'> {showListingsError ? 'Greška pri prikazivanju oglasa' : '' } </p>

            {userListings && userListings.length > 0 ? ( 
              <div className='flex flex-col gap-4'> 
                <h1 className='text-custom-text-color text-center mt-7 text-2xl font-semibold'> Ljubimci </h1>
                  {userListings.map((listing) => (
                    <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                      <Link to={`/listing/${listing._id}`}>
                        <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain rounded-lg'/>
                      </Link>

                      <Link className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
                        <p> {listing.name} </p>
                      </Link>

                      <div className='flex gap-4 sm:gap-8 items-center'> 
                        <button onClick={()=> handleListingDelete(listing._id)} className='text-red-700 uppercase'> Obrišite </button>

                        <Link to={`/update-listing/${listing._id}`}>
                          <button className='text-green-700 uppercase'> Ažurirajte </button>
                        </Link>
                      </div>

                    </div>
                  ))}

                <p className='text-red-700 mt-5'> {deleteListingError ?  'Greška pri brisanju oglasa' : '' } </p> 
              </div> 
            ) : (
              <div className=''>
                <p className='text-custom-text-color text-xl font-semibold text-center'> Trenutno nema rezultata za prikazivanje. </p>
              </div>
            )
            }
          </div>
        )}

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDeleteUser} title="Potvrda brisanja" message="Da li ste sigurni da želite da obrišete nalog?"/>

    </div>


  )
}
