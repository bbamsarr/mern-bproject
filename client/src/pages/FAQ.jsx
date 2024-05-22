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
                <Accordion question={"How do I create an account?"} answer={"To create an account click on 'SignUp' button on the 'Home' page. Fill in your username, email and password."}></Accordion>
                <Accordion question={"How do I post a pet for adoption?"} answer={"After logging in, navigate to your 'Profile' page and click on the 'Add new pet' on the sidebar menu. Fill out the form with details about the pet including pictures. Click on the button 'Create' to complete creating your listing."}></Accordion>
                <Accordion question={"How do I search for pets available for adoption?"} answer={"On the 'Home' page click on the 'Search for pets' button. You can filter pets by different criteria."}></Accordion>
                <Accordion question={"How do I adopt a pet?"} answer={"To adopt a pet click on the 'Adopt' button on the pet's profile page you wish to adopt. Complete the adoption form with necessary details and click on the 'Send' button. An email will be sent to the owner with your information. The owner will contact you to discuss the next steps in the adoption process."}></Accordion>
                <Accordion question={"Can I meet the pet before finalizing the adoption?"} answer={"Yes, we encourage you to meet the pet before finalizing the adoption. After you contact the owner and express your interest, you can set up a meeting."}></Accordion>
                <Accordion question={"Is there a fee to adopt a pet?"} answer={"No, there is no fee to adopt a pet through our web app."}></Accordion>
                <Accordion question={"What should I bring when meeting a pet for adoption?"} answer={"Bring a collar and leash (for dogs) or a carrier (for smaller animals). It can also be helpful to bring some treats to help make the pet feel more comfortable."}></Accordion>
                <Accordion question={"Can I adopt a pet if I live in an apartment?"} answer={"Yes, you can. However, make sure to chose a pet that will thrive in such environment."}></Accordion>
                <Accordion question={"What are the benefits of adopting a pet instead of buying one?"} answer={"Adopting a pet helps reduce the number of abandoned animals and those in shelters. By adopting a pet, you have the satisfaction of providing a second chance to someone that will love you unconditionaly."}></Accordion>
            </motion.div>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1, delay: 0.5 }} className='text-center'>
                <p className=''> For more information, feel free to explore our website or contact us via petadopt24@gmail.com. </p>
            </motion.div>
        </div>
    </div>
  )
}
