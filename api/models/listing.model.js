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
            type: Number,
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
        description: {
            type: String,
            required: true,
        },
        location: {
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
        //dodaj jos za adopted
    }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;