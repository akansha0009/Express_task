const express =  require("express");
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./src/route/user.route');



try { 
    mongoose.connect('mongodb+srv://root:root@cluster0.j6npz.mongodb.net/express_task?retryWrites=true&w=majority')
    console.log("Mongoose Connected to MongoDb Atlas");
  } catch (err) {
    console.log(err);
}

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));

app.use(userRoutes);
app.listen(4040, () => {
    console.log('Server is running...')
});