/*const express = require('express')

const expressQueen = express()

expressQueen.get('/',(request,response) => {      //status codes are from 100-500
  response.status(200).send('<h1> Hello Ama </h1>') 

})

expressQueen.listen(4040,() => {  //creates a port to run the app on
  console.log('The Queen is listening');
});
*/


require('dotenv').config()
const express = require('express') 
const mongoose = require('mongoose')  //importing express and mongoose


const app = express()

//variables
const dbLink = process.env.DBLINK   //reading the values in the .env
const port = process.env.PORT
const userRoute = require('./src/routes/userRoute')


mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
  app.listen(port, () => {
    console.log('DATABASE IS CONNECTED,SERVER IS UP');
  });

});

//routes
app.use(userRoute)

//callback function
//app.use('/sm', express.static("public"))

app.get('/' ,(req, res) => {
  res.status(200).send('<h1>Hey, b</h1>',)

})