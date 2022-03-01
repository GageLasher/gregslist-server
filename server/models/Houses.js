import { Schema } from "mongoose";


export const HouseSchema = new Schema(
    {
    size: {type: Number, required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    levels: {type: Number, required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account'}
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

// HouseSchema.virtual('creator', {
//       localField: 'creatorId',
//       foreignField: '_id',
//       justOne: true,
//       ref: 'Account'
//     })