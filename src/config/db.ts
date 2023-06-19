import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_DEV_URI, NODE_ENV } from "../utils/secrets";

export async function connectToDB(): Promise<void> {

  // Connecting to the database
  console.log("NODE_ENV ", NODE_ENV);
  let dbUri: string = NODE_ENV === "development" ? MONGODB_DEV_URI! : MONGODB_URI!;

  mongoose.set('strictQuery', false);
  await mongoose.connect(dbUri)
    .then(() => {
      console.log(`Successfully connected to MongoDB @ ${dbUri}`);
    }).catch((err: any) => {
      console.error("Error connecting to database: ", err);
      throw new Error(err);
    })
}

export async function closeDBConnection(): Promise<void> {
  // export async function closeDBConnection () : Promise<any> {
  return await mongoose.disconnect().then(() => {
    console.log("Disconnected from MongoDB");
  })
}