const express=require('express');
const app=express();
const PORT=5000; 
app.use(express.json())
//app.use(express.Router())
const mongoose = require('mongoose');

app.use( '/user',require('./routes/user.routes'))


mongoose.connect('mongodb+srv://houssem:Swkftd@cluster0.ac6es.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Check for successful connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  }).on('error', (error) => {
    console.error('Connection error:', error);
  });



app.listen (PORT,(err)=>{
    err ? console.log('err', err): console.log(`server is running on port: ${5000}`)

})

 
