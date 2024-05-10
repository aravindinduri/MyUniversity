import dbConnect from '../../../lib/DBConnect';
import UserModel from '../../../model/User.model';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingVerifiedUserByUsername = await UserModel.findOne({
            username,
        });

        if (existingVerifiedUserByUsername) {
            return Response.json(
                {
                    success: false,
                    message: 'Username is already taken',
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByEmail) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByEmail.password = hashedPassword;
            await existingUserByEmail.save();
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();
        }

        return Response.json(
            {
                success: true,
                message: 'User registered successfully. Please verify your account.',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }
}