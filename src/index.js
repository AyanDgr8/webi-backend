// src/index.js

// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js';
import 'colors';
import mongoose from "mongoose";

dotenv.config({
  path: './.env'
});

const server = app.listen(process.env.PORT, () => {
  console.log(`⚙️  Server is running at port : ${process.env.PORT}`.cyan.bold);
});

process.title = 'MultyComm Form';

const gracefulShutdown = async () => {
  console.log('📢 Received shutdown signal, closing server and database connections...'.yellow.bold);

  await mongoose.disconnect();
  server.close(() => {
    console.log('💤 Server and database connections closed successfully.'.blue.bold);
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

connectDB()
  .then(() => {
    console.log(`🔌 MongoDB connected`.green.bold);
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!! ".red.bold, err);
    process.exit(1);
  });

