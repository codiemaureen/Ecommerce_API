require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index');
//database
const connectDB = require('./db/connect');

//routes
app.use('/', routes);   

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
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