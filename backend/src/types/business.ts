import { Document } from "mongoose"

export interface IBusiness extends Document {
    title: string
    owner: string
    shortDdescription: string
    longDescription: string
    status: boolean
    campus: string
    isPublished: boolean
    user_id: string
}