import { Schema } from "mongoose"

export const HouseSchema = new Schema(
  {
    bedrooms: {
      type: Number,
      required: true,
      max: 50
    },
    bathrooms: {
      type: Number,
      required: true,
      max: 50
    },
    year: {
      type: Number,
      required: true,
      max: 2024,
      min: 1865
    },
    price: {
      type: Number,
      required: true,
      max: 3000000
    },
    imgUrl: {
      type: String,
      required: true,
      maxLength: 500
    },
    creatorId: {
      type: Schema.Types.ObjectId, required: true, ref: 'Account'
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)