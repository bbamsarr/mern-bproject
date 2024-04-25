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
                <p> Hello! I am reaching out with genuine interest in adopting your pet. 
                I am excited about the possibility of welcoming it into my family. Please find below my personal details.
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
            subject: `New Pet Adoption Request For ${regarding}`,
            html: formatEmailBody(formData),
            replyTo: emailFrom,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json('Email sent successfully');

    } catch (error) {
        next(error);
    }
}