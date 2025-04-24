import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';
// import { nanoid } from 'nanoid';

const orderSchema = new Schema({
    _id: {
        type: String,
        // default: () => nanoid(7),
         // Generate a unique ID
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed'],
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

orderSchema.plugin(normalize);

export const OrderModel = model('Order', orderSchema);
