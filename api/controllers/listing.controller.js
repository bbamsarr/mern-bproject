import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {

    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};


export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing)
        return next(errorHandler(404, 'Listing not found'));

    if (req.user.id !== listing.userRef)
        return next(errorHandler(401, 'You can only delete your listings'));

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
};


export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) 
        return next(errorHandler(404, 'Listing not found'));

    if (req.user.id !== listing.userRef)
        return next(errorHandler(401, 'You can only update your listings'));

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};


export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing)
            return next(errorHandler(404, 'Listing not found'));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

////////////////// ovo mora da se proveri opet !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const getListings =  async (req, res, next) => {

    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
    
        const searchTerm = req.query.searchTerm || ''; //species
        const breed = req.query.breed || '';
        const location = req.query.location || '';
        const age = req.query.age || '';
        const size = req.query.size || '';
        const gender = req.query.gender || '';


        let vaccinated = req.query.vaccinated;
        if (vaccinated === undefined || vaccinated === 'false') {
            vaccinated = { $in: [true, false]};
        }
        let houseTrained = req.query.houseTrained;
        if (houseTrained === undefined || houseTrained === 'false') {
            houseTrained = { $in: [true, false]};
        } 

        
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        /*const query = {};
        if (searchTerm)
            query.species = { $regex: searchTerm, $options: 'i' };
        if (breed)
            query.breed = { $regex: breed, $options: 'i' };
        if (location)
            query.location = { $regex: location, $options: 'i' };
        if (age)
            query.age = { $regex: age, $options: 'i' };
        if (size)
            query.size = { $regex: size, $options: 'i' };
        if (gender)
            query.gender = { $regex: gender, $options: 'i' };
        */

        const query = {
            species: { $regex: searchTerm, $options: 'i' },
            breed: { $regex: breed, $options: 'i' },
            location: { $regex: location, $options: 'i' },
            vaccinated: vaccinated,
            houseTrained: houseTrained,
        };
        if (age !== '')
            query.age = { $regex: age, $options: 'i'};
        if (size !== '')
            query.size =  { $regex: size, $options: 'i' };
        if (gender !== '')
            query.gender =  gender.toLowerCase();

        const listings = await Listing.find(query)
            .sort({[sort]:order})
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }

};