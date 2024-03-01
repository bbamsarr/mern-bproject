import React from 'react'
import Accordion from '../components/Accordion'
import { motion } from 'framer-motion';

const fadeInAnimation = {
    initial: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

export default function FAQ() {
  return (
    <div className='max-w-6xl mx-auto min-h-screen mt-[80px] xl:mt-[100px] mb-[80px] md:mb-0'>
        <div className='flex flex-col items-center gap-8 p-4'>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true}} transition={{ duration: 1 }} className='text-center'>
                <h1 className='text-3xl font-semibold'> You have questions? We have answers! </h1>
            </motion.div>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true}} transition={{ duration: 1, delay: 0.5 }} className='max-w-4xl mx-auto w-full'>
                <Accordion question={"This is a very long question here, do you like long questions?"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like dogs"} answer={"Yes, Cras sed felis eget velit aliquet sagittis id consectetur purus. Vitae sempe at erat a iaculis molestie mattis."}></Accordion>
                <Accordion question={"Do you like cats"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like pets"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like dogs"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like cats"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like pets"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like dogs"} answer={"Yes"}></Accordion>
                <Accordion question={"Do you like cats"} answer={"Yes"}></Accordion>
            </motion.div>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1, delay: 0.5 }} className='text-center'>
                <p className=''> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </motion.div>
        </div>
    </div>
  )
}
