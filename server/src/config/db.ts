
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const localUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

        // 1. Try Local Connection
        try {
            const conn = await mongoose.connect(localUri, {
                serverSelectionTimeoutMS: 5000 // Fail fast if no local DB
            });
            console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
            return;
        } catch (err) {
            console.log("⚠️ Local MongoDB not found (Connection Refused).");
        }

        // 2. Fallback: Portable In-Memory DB
        console.log("🔄 Starting Portable Database (mongodb-memory-server)...");
        try {
            // Dynamic import to avoid crash if dependency is missing
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();

            console.log(`✅ Portable Database Started: ${uri}`);

            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected (Portable Mock): ${conn.connection.host}`);

            // Note: Data will be lost on restart
        } catch (memErr: any) {
            console.error("❌ Failed to start Portable DB. Please install it or use a Cloud URI.");
            console.error(memErr.message);
            process.exit(1);
        }

    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
