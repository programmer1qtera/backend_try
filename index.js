const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/db_connect');
const {
    notFound,
    errorHandler
} = require('./middlewares/error_handler');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/auth_route');
dbConnect();
// app.use('/', (req, res) => {
//     res.send('Hello from world');
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server run at ${PORT}`);
});