import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        species: '',
        breed: '',
        description: '',
        location: '',
        vaccinated: false,
        houseTrained: false,
        age: 'young',
        size: 'small',
        gender: 'male',
        status: 'forAdoption',
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        };
        fetchListing();
    }, []);
   
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);

            const promises = [];
            for (let i=0; i<files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Failed to upload image (max size 2MB per image)');
                setUploading(false);
            });
        }
        else {
            setImageUploadError('Maximum upload of 6 images');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                }, 
                (error) => { reject(error); },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    };

    //.......
    const handleChange = (e) => {
        if (e.target.id === 'vaccinated' || e.target.id === 'houseTrained') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }

        if (e.target.tagName === 'SELECT') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError('You must upload at least one image');
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

  return (
    <main className='p-3 max-w-4xl mx-auto mb-[80px] xl:mb-[160px]'>
        <h1 className='text-custom-contrast-color text-3xl font-semibold text-center my-7'> Ažuriraj ljubimca </h1>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Ime' className='border p-3 rounded-lg' id='name' maxLength='30' minLength='2' required onChange={handleChange} value={formData.name}/>
                
                <input type="text" placeholder='Vrsta' className='border p-3 rounded-lg' id='species' required onChange={handleChange} value={formData.species}/>
                <input type="text" placeholder='Rasa' className='border p-3 rounded-lg' id='breed' required onChange={handleChange} value={formData.breed}/>

                <textarea type="text" placeholder='Opis' rows='5' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description}/>
                <input type="text" placeholder='Lokacija' className='border p-3 rounded-lg' id='location' required onChange={handleChange} value={formData.location}/>

                <div className='flex flex-wrap gap-4'>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id='vaccinated' className='w-5' onChange={handleChange} checked={formData.vaccinated}/>
                        <span> Vakcinisan </span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id='houseTrained' className='w-5' onChange={handleChange} checked={formData.houseTrained} />
                        <span> Naučen na život u kući </span>
                    </div>
                </div>

                {/*<div className=''>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='age' min='0' max='20' required className='border p-3 rounded-lg' onChange={handleChange} value={formData.age} />
                        <p> Age </p>
                    </div>
                </div> */}

                <select id='age' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.age}>
                    <option value="young"> Mladi </option>
                    <option value="adult"> Odrasli </option>
                    <option value="senior"> Stariji </option>
                </select>

                <select id='size' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.size}>
                    <option value="small"> Mali </option>
                    <option value="medium"> Srednji </option>
                    <option value="big"> Veliki </option>
                </select>

                <select id='gender' className='border p-3 rounded-lg' required onChange={handleChange} value={formData.gender}>
                    <option value="male"> Mužjak </option>
                    <option value="female"> Ženka </option>
                </select>

            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '> Slike: 
                <span className='font-normal text-gray-700 ml-2'> Maksimalno 6 slika </span>
                </p>

                <div className='flex flex-row gap-4'>
                    <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className='p-3 border rounded-lg w-full' />
                    <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-custom-contrast-color border border-custom-contrast-color rounded-lg hover:bg-custom-contrast-color hover:text-white hover:shadow-lg transition duration-500 ease-in-out disabled:opacity-80'> 
                        {uploading ? 'Učitavanje...' : 'Otpremi'} 
                    </button>
                </div>
                <p className='text-red-700 text-sm'> {imageUploadError && imageUploadError} </p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'> 
                                Obriši 
                            </button>
                        </div>
                    ))
                }

                <button disabled={loading || uploading} className='p-3 bg-custom-contrast-color text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? 'Ažuriranje...' : 'Ažuriraj'} </button>
                { error && <p className='text-red-700 text-sm'> {error} </p> }
            </div>

        </form>
    </main>
  )
}
