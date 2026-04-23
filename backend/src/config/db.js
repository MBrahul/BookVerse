import mongoose from 'mongoose';

const url = process.env.DB_URL;

const connnectToDb = async () => {
    try {
        mongoose.connect(url).then((data) => {
            console.log("db connected");
        }).catch((error) => {
            throw Error("Database connection failed :", error)
        });
    } catch (error) {
        throw Error("Database connection failed :", error);
    }
}

export default connnectToDb;
