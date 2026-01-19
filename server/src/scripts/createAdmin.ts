import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import connectDB from '../config/db';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const username = 'admin';
        const password = 'adminpassword123'; // CHANGE THIS!

        const userExists = await User.findOne({ username });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
            isAdmin: true
        });

        await user.save();
        console.log(`Admin created successfully.\nUsername: ${username}\nPassword: ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
