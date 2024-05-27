import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Link, redirect } from 'react-router-dom';

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

    const translatedFormData = (data) => {
        const translated = {
            fullName: 'Puno ime',
            email: 'Email',
            address: 'Adresa',
            phoneNumber: 'Broj telefona',
            housing: 'Tip stanovanja',
            yard: 'Dvorište',
            adultsInTheHousehold: 'Odrasli u domaćinstvu',
            kidsInTheHousehold: 'Deca u domaćinstvu',
            otherPets: 'Drugi kućni ljubimci',
            otherPetsDescription: 'Opis drugih ljubimaca',
            whereWillPetSleep: 'Gde će ljubimac spavati',
            hoursAlone: 'Broj sati koje će biti sam',
            agreementToProvideRegularHealthCare: 'Sporazum o redovnoj zdravstvenoj zaštiti',
            agreementToSpayThePet: 'Sporazum o sterilizaciji ljubimca',
            yes: 'da',
            no: 'ne',
            house: 'kuca',
            apartment: 'stan',
        };
        return Object.keys(data).reduce((acc, key) => {
            const value = data[key];
            if (typeof value === 'boolean') {
                acc[translated[key] || key] = value ? translated.yes : translated.no;
            } else if (key === 'housing' && (value === 'house' || value === 'apartment')) {
                acc[translated[key] || key] = translated[value];
            } else {
                acc[translated[key] || key] = value;
            }
            return acc;
        }, {}); 
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const translatedData = translatedFormData(formData);
            const res = await fetch('/api/email/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...translatedData,
                    emailFrom: formData.email,
                    emailTo: owner.email,
                    regarding: listing.name,
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Email uspešno poslat!');
                onClose();
            } else {
                throw new Error(data.message || 'Greška pri slanju email-a');
            }
        }
        catch (error) {
            console.log('Error:', error);
        }
    };
    
    {/** 
    const introText = "Hello! I am reaching out with genuine interest in adopting your pet. Please find below my personal details.";
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
    */}                  

    if(!isOpen)
    return null;

    return (
        <div className='bg-gray-600 bg-opacity-50 fixed inset-0 flex justify-center items-center z-50'>
            <div className='bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl mx-4 md:mx-0 max-h-[90vh] overflow-y-auto'>
                <form onSubmit={onSubmit} className='flex flex-col items-center gap-4'>
                    <div className='flex flex-col items-center justify-center'>
                        <FaHeart className='text-red-700 text-3xl'> </FaHeart>
                        <h1 className='text-2xl text-custom-text-color text-semibold'>Formular za usvajanje ljubimca</h1>
                    </div>

                    <div className='flex flex-col w-full gap-2 '>
                        <h2 className='text-semibold text-custom-orange text-xl'> Lični podaci </h2>
                        <div className='border-b-2 border-custom-orange'></div>
                        <input type="text" id="fullName" placeholder='Puno ime' className='border p-3 rounded-lg' onChange={handleChange} value={formData.fullName}/>
                        <input type="text" id="address" placeholder='Adresa' className='border p-3 rounded-lg' onChange={handleChange} value={formData.address}/>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <input type="text" id="phoneNumber" placeholder='Broj telefona' className='border p-3 rounded-lg' onChange={handleChange} value={formData.phoneNumber}/>
                            <input type="text" id="email" placeholder='Email' className='border p-3 rounded-lg w-full' onChange={handleChange} value={formData.email}/>
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h2 className='text-semibold text-custom-darkblue text-xl'> Podaci o domaćinstvu </h2>
                        <div className='border-b-2 border-custom-darkblue'></div>

                        <label> Koji tip stanovanja imate? </label>
                        <div className='flex gap-2'>
                            <input type='radio' id='house' name='housing' value='house' className='w-5' onChange={handleChange} checked={formData.housing === 'house'}/>
                            <label> Kuća </label>
                            <input type='radio' id='apartment' name='housing' value='apartment' className='w-5' onChange={handleChange} checked={formData.housing === 'apartment'}/>
                            <label> Stan </label>
                        </div>
                        
                        <div className='flex gap-2'>
                            <label> Da li imate dvorište? </label>
                            <input type='checkbox' id='yard' className='w-5' onChange={handleChange} checked={formData.yard}/>
                            <label> Da </label>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <label> Broj odraslih u domaćinstvu: </label>
                                <input type='number' id='adultsInTheHousehold' min='1' max='20' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.adultsInTheHousehold}/>
                            </div>
                            <div className='flex items-center gap-2'>
                                <label> Broj dece u domaćinstvu: </label>
                                <input type='number' id='kidsInTheHousehold' min='0' max='20' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.kidsInTheHousehold}/>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <h2 className='text-semibold text-custom-orange text-xl'> Ostali ljubimci i stil života </h2>
                        <div className='border-b-2 border-custom-orange'></div>
                        <div className='flex gap-2'>
                            <label> Da li imate druge ljubimce? </label>
                            <input type='checkbox' id='otherPets' className='w-5' onChange={handleChange} checked={formData.otherPets}/>
                            <label> Da </label>
                        </div>
                        {formData.otherPets && (
                            <div className='flex flex-col gap-2'>
                                <label> Molimo Vas da date opis </label>
                                <textarea type="text" placeholder='Opis' className='border p-3 rounded-lg' id='otherPetsDescription' onChange={handleChange} value={formData.otherPetsDescription}/>
                            </div>
                        )}
                        <div className='flex items-center gap-2'>
                            <label> Gde će ljubimac spavati: </label>
                            <input type='text' id='whereWillPetSleep' className='border p-3 rounded-lg' onChange={handleChange} value={formData.whereWillPetSleep}/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> Koliko sati će ljubimac biti sam: </label>
                            <input type='number' id='hoursAlone' min='0' max='24' className='border p-3 rounded-lg w-16' onChange={handleChange} value={formData.hoursAlone}/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> Da li ćete obezbediti redovnu zdravstvenu zaštitu: </label>
                            <input type='checkbox' id='agreementToProvideRegularHealthCare' className='w-5' onChange={handleChange} checked={formData.agreementToProvideRegularHealthCare}/>
                            <label> Da </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label> Da li ćete sterilizovati ljubimca (ako to već nije urađeno): </label>
                            <input type='checkbox' id='agreementToSpayThePet' className='w-5' onChange={handleChange} checked={formData.agreementToSpayThePet}/>
                            <label> Da </label>
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
                        <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-7 py-2 rounded-lg' onClick={onClose}> Zatvori </button>
                        {owner && ( 
                            <button className='bg-custom-contrast-color text-white text-center px-7 py-2 rounded-lg hover:opacity-95'>
                                Pošalji 
                            </button>
                        )}   
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Modal;
 