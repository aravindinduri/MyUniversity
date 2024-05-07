import mongoose, { Schema, Document } from 'mongoose';



export interface Review extends Document {

}

const ReviewSchema: Schema<Review> = new mongoose.Schema({


});

const UserModel =
    (mongoose.models.User as mongoose.Model<Review>) ||
    mongoose.model<Review>('User', ReviewSchema);

export default UserModel;