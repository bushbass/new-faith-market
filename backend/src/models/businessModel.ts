import { IBusiness } from '../types/business'
import { model, Schema } from "mongoose"



const businessSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = model<IBusiness>('Business', businessSchema)
