require('dotenv').config();
require('express-async-errors'); 
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRouter');
//database
const connectDB = require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));


app.get('/api/v1', (req,res) => {
    console.log(req.signedCookies);
    res.send('E-Commerce')
});

//routes
app.use('/api/v1/auth', authRouter);   

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => 
        console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();