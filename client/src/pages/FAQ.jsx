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
                <h1 className='text-3xl font-semibold'> Imate pitanja? Mi imamo odgovore! </h1>
            </motion.div>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true}} transition={{ duration: 1, delay: 0.5 }} className='max-w-4xl mx-auto w-full'>
                <Accordion question={"Kako da napravim nalog?"} answer={"Da biste napravili nalog, kliknite na dugme 'Registruj se' koje se nalazi na početnoj stranici. Popunite vaše korisničko ime, email i lozinku."}></Accordion>
                <Accordion question={"Kako da postavim ljubimca za usvajanje?"} answer={"Nakon prijavljivanja, idite na Vašu profilnu stranicu i kliknite na 'Dodaj novog ljubimca' u meniju sa strane. Popunite formular sa detaljima o ljubimcu, uključujući slike. Kliknite na dugme 'Kreiraj' da biste završili kreiranje Vašeg oglasa."}></Accordion>
                <Accordion question={"Kako da pretražim ljubimce dostupne za usvajanje?"} answer={"Na početnoj stranici kliknite na 'Pretraži ljubimce' dugme. Možete filtrirati ljubimce prema različitim kriterijumima."}></Accordion>
                <Accordion question={"Kako da usvojim ljubimca?"} answer={"Da biste usvojili ljubimca, kliknite na dugme 'Usvoji' na profilu ljubimca kojeg želite da usvojite. Popunite formular za usvajanje sa potrebnim detaljima i kliknite na dugme 'Pošalji'. Email sa Vašim informacijama biće poslat vlasniku. Vlasnik će Vas kontaktirati kako biste dogovorili sledeće korake u procesu usvajanja."}></Accordion>
                <Accordion question={"Da li mogu upoznati ljubimca pre nego što finalizujem usvajanje?"} answer={"Da, preporučujemo da upoznate ljubimca pre nego što finalizujete usvajanje. Nakon što kontaktirate vlasnika i izrazite svoje interesovanje, možete dogovoriti sastanak."}></Accordion>
                <Accordion question={"Da li postoji naknada za usvajanje ljubimca?"} answer={"Ne, nema naknade za usvajanje ljubimca preko naše veb aplikacije."}></Accordion>
                <Accordion question={"Šta treba da ponesem kada se sretnem sa ljubimcem za usvajanje?"} answer={"Ponesite ogrlicu i povodac (za pse) ili transporter (za manje životinje). Takođe, može biti korisno poneti i neke poslastice kako bi se Vaš novi ljubimac osećao prijatnije."}></Accordion>
                <Accordion question={"Da li mogu usvojiti ljubimca ako živim u stanu?"} answer={"Da, možete. Međutim, važno je da izaberete ljubimca koji će napredovati u takvom okruženju."}></Accordion>
                <Accordion question={"Koje su prednosti usvajanja ljubimca u odnosu na kupovinu istog?"} answer={"Usvajanjem ljubimca pomažete u smanjenju broja napuštenih životinja i onih u azilima. Pružaćete ljubav i dom životinji koja to zaslužuje, a zauzvrat ćete dobiti vernog prijatelja i neverovatan osećaj zadovoljstva i ispunjenosti jer ste nekome pružili novu priliku za srećan život."}></Accordion>
            </motion.div>
            <motion.div variants={fadeInAnimation} initial="initial" whileInView="visible" viewport={{once: true, amount: 0.1}} transition={{ duration: 1, delay: 0.5 }} className='text-center'>
                <p className=''> Za više informacija, slobodno istražite našu veb aplikaciju ili nas kontaktirajte putem petadopt24@gmail.com. </p>
            </motion.div>
        </div>
    </div>
  )
}
