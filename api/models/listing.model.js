import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        vaccinated: {
            type: Boolean,
            required: true,
        },
        houseTrained: {
            type: Boolean, 
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;