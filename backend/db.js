const mongoose = require('mongoose');

const url = process.env.DB_URL;

const connnectToDb = async()=>{
    try {
        await mongoose.connect(url).then((error)=>{
            console.log("db connected");
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connnectToDb;
