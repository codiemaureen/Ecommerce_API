require('dotenv').config();
require('express-async-errors'); 
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

//database
const connectDB = require('./db/connect');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());



app.get('/api/v1', (req,res) => {
    console.log(req.signedCookies);
    res.send('E-Commerce')
});

//routes
app.use('/api/v1/auth', authRouter);   
app.use('/api/v1/users', userRouter);   
app.use('/api/v1/products', productRouter);   

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