import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Modal = ({isOpen, onClose, listing}) => {
    const [owner, setOwner] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        phoneNumber: '',
        housing: 'house',
        yard: false,
        adultsInTheHousehold: 1,
        kidsInTheHousehold: 0,
        otherPets: false,
        otherPetsDescription: '',
        whereWillPetSleep: '',
        hoursAlone: 0,
        agreementToProvideRegularHealthCare: false,
        agreementToSpayThePet: false,
    });
    console.log(formData);

    useEffect(() => {
        if (isOpen) {
            const fetchOwner = async () => {
                try {
                    const res = await fetch(`/api/user/${listing.userRef}`);
                    const data = await res.json();
                    setOwner(data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchOwner();
        }
    }, [isOpen, listing.userRef]);

    const handleChange = (e) => {
        if (e.target.id === 'house' || e.target.id === 'apartment') {
            setFormData({ 
                ...formData, 
                housing: e.target.value,
            });
        }

        if (e.target.id === 'yard' || e.target.id === 'otherPets' || e.target.id === 'agreementToProvideRegularHealthCare' || e.target.id === 'agreementToSpayThePet') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            });
        }

        if (e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

    };
    
    const introText = "Here is the intro text";
    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };
    const formatValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        return value;
    };

    const formatDataForSending = (formData, introText) => {
        const formattedFormData = Object.entries(formData).map(([key, value]) => `${formatKey(key)}: ${formatValue(value)}`).join('%0D%0A');
        return (introText + '%0D%0A%0D%0A' + formattedFormData);
    };

    let dataForSending = "";
    if (owner)
        dataForSending = formatDataForSending(formData, introText);
                                

    if(!isOpen)
    return null;

    return (
        <div className='bg-gray-600 bg-opacity-50 fixed inset-0 flex justify-center items-center z-40'>
            <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl mx-4 md:mx-0 max-h-[90vh] overflow-y-auto'>
                <form onSubmit={onSubmit} className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col items-center justify-center'>
                        <FaHeart className='text-custom-orange text-3xl'> </FaHeart>
                        <h1 className='text-2xl text-custom-darkblue text-semibold'>Pet Adoption Form</h1>
                    </div>

                    <div className='flex flex-col w-full gap-2 '>
                        <h2 className='text-semibold text-custom-orange text-xl'> Personal information </h2>
                        <div className='border-b-2 border-custom-orange'></div>
                        <input type="text" id="fullName" placeholder='Full Name' className='border p-3 rounded-lg' onChange={handleChange} value={formData.fullName}/>
                        <input type="text" id="address" placeholder='Address' className='border p-3 rounded-lg' onChange={handleChange} value={formData.address}/>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <input type="text" id="phoneNumber" placeholder='Phone Number' className='border p-3 rounded-lg' onChange={handleChange} value={formData.phoneNumber}/>
                            <input type="text" id="email" placeholder='Email' className='border p-3 rounded-lg w-full' onChange={handleChange} value={formData.email}/>
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h2 className='text-semibold text-custom-darkblue text-xl'> Household information </h2>
                        <div className='border-b-2 border-custom-darkblue'></div>

                        <label> What type of housing do you live in? </label>
                        <div className='flex gap-2'>
                            <input type='radio' id='house' name='housing' value='house' className='w-5' onChange={handleChange} checked={formData.housing === 'house'}/>
                            <label> House </label>
                            <input type='radio' id='apartment' name='housing' value='apartment' className='w-5' onChange={handleChange} checked={formData.housing === 'apartment'}/>
                            <label> Apartment </label>
                        </div>
                        
                        <div className='flex gap-2'>
                            <label> Do you have a yard? </label>
                            <input type='checkbox' id='yard' className='w-5' onChange={handleChange} checked={formData.yard}/>
                            <label> Yes </label>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <label> Adults in the household: </label>
                                <input type='number' id='adultsInTheHousehold' min='1' max='20' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.adultsInTheHousehold}/>
                            </div>
                            <div className='flex items-center gap-2'>
                                <label> Kids in the household: </label>
                                <input type='number' id='kidsInTheHousehold' min='0' max='20' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.kidsInTheHousehold}/>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h2 className='text-semibold text-custom-orange text-xl'> Other pets and lifestyle </h2>
                        <div className='border-b-2 border-custom-orange'></div>
                        <div className='flex gap-2'>
                            <label> Do you have other pets? </label>
                            <input type='checkbox' id='otherPets' className='w-5' onChange={handleChange} checked={formData.otherPets}/>
                            <label> Yes </label>
                        </div>
                        {formData.otherPets && (
                            <div className='flex flex-col gap-2'>
                                <label> Please provide description</label>
                                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='otherPetsDescription' onChange={handleChange} value={formData.otherPetsDescription}/>
                            </div>
                        )}
                        <div className='flex items-center gap-2'>
                            <label> Where will the pet sleep: </label>
                            <input type='text' id='whereWillPetSleep' className='border p-3 rounded-lg' onChange={handleChange} value={formData.whereWillPetSleep}/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> How many hours will the pet be alone: </label>
                            <input type='number' id='hoursAlone' min='0' max='24' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.hoursAlone}/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> Do you agree to provide regular health care: </label>
                            <input type='checkbox' id='agreementToProvideRegularHealthCare' className='w-5' onChange={handleChange} checked={formData.agreementToProvideRegularHealthCare}/>
                            <label> Yes </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> Do you agree to spay/neuter the pet (if not already done): </label>
                            <input type='checkbox' id='agreementToSpayThePet' className='w-5' onChange={handleChange} checked={formData.agreementToSpayThePet}/>
                            <label> Yes </label>
                        </div>
                    </div>

                    {/** 
                    {owner && (
                    <div className=''>
                        <p>
                            Contact: <label> {owner.username} for {listing.name} </label>
                        </p>
                    </div>    
                    )}*/}

                    <div className='flex  justify-center gap-20'>
                        <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-7 py-2 rounded-lg' onClick={onClose}> Close </button>
                        {owner && ( 
                            <Link to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${dataForSending}`} className='bg-custom-darkblue text-white text-center px-7 py-2 rounded-lg hover:opacity-95'>
                                Send 
                            </Link>
                        )}   
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Modal;
 