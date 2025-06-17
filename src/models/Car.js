import { Schema } from "mongoose";

export const CarSchema = new Schema(
  {
    // NOTE the database will automatically assign our data a unique ID, so we don't need to include it on our schema
    make: { type: String, minLength: 3, maxLength: 50, required: true },
    model: { type: String, minLength: 1, maxLength: 100, required: true },
    // TODO show custom validator
    year: { type: Number, min: 1886, max: 2025, required: true },
    price: { type: Number, min: 0, max: 1000000, required: true },
    imgUrl: { type: String, maxLength: 500, required: true },
    description: { type: String, maxLength: 500 },
    engineType: { type: String, enum: ['V6', 'V8', 'V10', '4-cylinder', 'unknown'], required: true },
    color: { type: String, maxLength: 50, required: true },
    tags: { type: [String], maxLength: 20 },
    mileage: { type: Number, min: 0, max: 1000000, required: true },
    hasCleanTitle: { type: Boolean, required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  // NOTE schema options
  {
    timestamps: true, // automatically adds updatedAt and createdAt timestamps
    versionKey: false, // removes __v
    toJSON: { virtuals: true } // allows virtual properties when converting to JSON
  }
)

CarSchema.virtual('creator', {
  localField: 'creatorId', // something from my schema that I can use to access data in another collection
  ref: 'Account', // the collection we are looking through for a match
  foreignField: '_id', // what will my localField match in the ref collection
  justOne: true // there will only be one match
})