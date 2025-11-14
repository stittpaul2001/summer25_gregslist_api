import { Schema } from "mongoose"

function validateDate(value) {
  const currentYear = new Date().getFullYear()
  return value <= currentYear + 1
}
export const PetSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 100,
      required: true
    },
    imgUrl: {
      type: String,
      minlength: 1,
      maxlength: 1000,
      required: true
    },
    age: {
      type: Number,
      min: 0,
      max: 5000,
      required: true,
      validate: {
        validator: validateDate,
        message: `{Value} is not a valid year (must be less than or equal to ${new Date().getFullYear() + 1})`
      }
    },
    likes: {
      type: [String],
      maxLength: 20
    },
    isVaccinated: {
      type: Boolean,
      required: true
    },
    species: {
      type: String,
      enum: ['cat', 'dog', 'bird', '4-capybara'],
      required: true
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

PetSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
