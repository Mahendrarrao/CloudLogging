const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Logs = require('./src/model/LogSchema'); 
const PORT = 4000;

app.use(cors());

mongoose.connect("mongodb+srv://BrundaB5:BrundaB5@123@cluster0.vw63z.mongodb.net/cloud-logging?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));

app.get('/logs', (req, res) => {
  console.log('Sending the logs');
    Logs.find({}, { _id: 0, __v: 0 }, { lean: true })
      .then(logs => res.json(logs))
      .catch(err => res.status(404).json({ nologsfound: 'No Logs found' }));
  });

app.post('/', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
   Logs.create(req.body)
      .then(book => res.json({ msg: 'Logs added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to log activity' }));
  });

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});