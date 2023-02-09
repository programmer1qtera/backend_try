const {
    default: mongoose
} = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('DB Terkoneksi');

    } catch (error) {
        // throw new Error(error)
        console.log('DB Error');
    }
};
module.exports = dbConnect;