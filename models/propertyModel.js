import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';

const propertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    photos: [{
        type: String,
        required: true
    }],
    amenities: [{
        type: String 
    }],
    ratingAverage: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

propertySchema.plugin(normalize);

export const PropertyModel = model('Property', propertySchema);
