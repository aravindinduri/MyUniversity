import mongoose, { Schema, Document } from 'mongoose';



export interface Review extends Document {
    administration: number;
    infrastructure: number;
    mess: number;
    extraCurricular: number;
    faculty: number;
    description: string;

}

const ReviewSchema: Schema<Review> = new mongoose.Schema({
    administration: {
        required: true
    },
    infrastructure: {
        type: Number,
        required: true
    },
    mess: {
        type: Number,
        required: true
    },
    faculty: {
        type: Number,
        required: true

    },
    extraCurricular: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });

const UserModel =
    (mongoose.models.User as mongoose.Model<Review>) ||
    mongoose.model<Review>('Review', ReviewSchema);

export default UserModel;