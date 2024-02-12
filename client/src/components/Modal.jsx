import React from 'react'
import { FaTrash, FaExclamationCircle } from 'react-icons/fa'

const Modal = ({isOpen, onClose, onConfirm, title, message}) => {
    if(!isOpen)
        return null;

    return (
        <div className='bg-gray-600 bg-opacity-50 fixed inset-0 flex justify-center items-center z-40'>
            <div className='flex flex-col items-center gap-6 bg-white p-4 rounded-lg shadow-lg'>
                <FaTrash className='text-red-700 text-3xl'> </FaTrash>
                <h1 className='text-xl text-semibold'> {title} </h1>
                <p className='text-red-700'> {message} </p>
                <div className='flex gap-12'>
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg' onClick={onClose}> Close </button>
                    <button className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg' onClick={onConfirm}> Confirm </button>
                </div>

            </div>
        </div>
    )
}

export default Modal;
 