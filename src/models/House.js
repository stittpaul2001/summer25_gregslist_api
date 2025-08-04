import { Schema } from "mongoose";

function validateDate(value) {
  const currentYear = new Date().getFullYear()
  return value <= currentYear + 1
}

// House.js
export const HouseSchema = new Schema(
  {
    // Properties from UML go here!
    bedrooms: {
      type: Number,
      min: 0,
      max: 30,
      required: true
    },

    bathrooms: {
      type: Number,
      min: 0,
      max: 25,
      required: true
    },

    levels: {
      type: Number,
      min: 1,
      max: 4,
      required: true
    },

    price: {
      type: Number,
      min: 0,
      max: 10000000,
      required: true
    },

    imgUrl: {
      type: String,
      maxlength: 500,
      required: true
    },

    description: {
      type: String,
      maxlength: 500
    },

    year: {
      type: Number,
      min: 1000,
      required: true,
      validate: {
        validator: validateDate,
        message: `{Value} is not a valid year (must be less than or equal to ${new Date().getFullYear() + 1})`
      }
    },

    creatorId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Account'
    }
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }

)

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
