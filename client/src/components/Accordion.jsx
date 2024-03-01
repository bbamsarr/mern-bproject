import React from 'react'
import { useState } from 'react';

export default function Accordion({question, answer}) {
    const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className='py-4 px-6 border-b bg-white'>
        <button onClick={() => setAccordionOpen(!accordionOpen)} className='flex items-center justify-between w-full text-start'>
            <span className='font-semibold'> {question} </span>
            {accordionOpen ? <span className='font-semibold text-xl'> - </span> : <span className='font-semibold text-xl'> + </span>}
        </button>
        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0" }`}>
            <div className='overflow-hidden'>
                {answer}
            </div>
        </div>
    </div>
  )
}
