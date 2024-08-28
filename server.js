const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const routes = require('./routes/index.js');
require('dotenv').config();

const app = express();
app.use(cors())
const PORT = process.env.port || 8080;

app.use(express.json());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
