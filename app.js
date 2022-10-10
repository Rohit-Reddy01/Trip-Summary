const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

require("dotenv").config();
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=>console.log("Database connected .."))
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
// app.use(authRoutes);
app.use(tripRoutes)
app.use(eventRoutes)

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
