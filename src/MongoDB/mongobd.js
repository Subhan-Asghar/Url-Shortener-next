import mongoose from "mongoose";

const connection = async () => {
    if (mongoose.connections[0].readyState) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        mongoose.connect('mongodb://127.0.0.1:27017/nextjs')
            .then(() => console.log('Connected!'));

    }
    catch (err) {
        console.log("Error ", err)
    }
}

export default connection;