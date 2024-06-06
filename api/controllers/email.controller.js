import nodemailer from 'nodemailer';
import { errorHandler } from '../utils/error.js';

function formatEmailBody(formData) {
    const formatKey = (key) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };
    const formatValue = (value) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        return value;
    };
    const entries = Object.entries(formData);
    const formattedEntries = entries.map(([key, value]) => `<p><strong>${formatKey(key)}:</strong> ${formatValue(value)}</p>`);
    return `<div>
                <p> Zdravo! Javljam se sa velikim interesovanjem za usvajanje Vašeg ljubimca. 
                U nastavku Vam šaljem svoje lične podatke.
                </p>
                ${formattedEntries.join('')}
            </div>`;
}

export const sendEmailForAdoption = async (req, res, next) => {
    const { emailFrom, emailTo, regarding, ...formData } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:'petadopt24@gmail.com',
                pass:'cutqyggnjlljpsix'
            }
        });

        const mailOptions = {
            from: emailFrom,
            to: emailTo,
            subject: `Zahtev za usvajanje kućnog ljubimca: ${regarding}`,
            html: formatEmailBody(formData),
            replyTo: emailFrom,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json('Email je uspešno poslat!');

    } catch (error) {
        next(error);
    }
}