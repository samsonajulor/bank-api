// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server'
// export const connectDB = (url: string) => {
//  return mongoose.connect(url);
// }


// export const connectTestDB = () => {


//  try {
//   MongoMemoryServer.create().then((mongo) => {
//    const uri = mongo.getUri();
//    mongoose.connect(uri).then(() => {
//     console.log("connected to testDB");
//    })
//   })
//  }
//  catch (error) {
//   console.log(error);
//  }
// }


// export default connectDB;


import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
export const connectDB = () => {
 try {
  mongoose.connect(process.env.DATABASE as string).then(() => {
   console.log("Connected to DB");
  });
 } catch (error) {
  console.log(error);
 }
};
export const connectTestDB = () => {
 try {
  MongoMemoryServer.create().then((mongo) => {
   const uri = mongo.getUri();
   mongoose.connect(uri).then(() => {
    console.log("connected to testDB");
   });
  });
 }
 catch (error) {
  console.log(error);
 }
};