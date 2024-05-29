import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@quinns-linkedin-clone-cluster.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
  // checks that connection alrady established to mongodb
  if (mongoose.connection?.readyState >= 1) {
    return;
  }

  // if no connection established
  try {
    console.log("---- Connecting to MongoDB ----");
    await mongoose.connect(connectionString);
    console.log("---- Connected to MongoDB ----");
  } catch (e) {
    console.log("Error connecting to MongoDB: ", e);
  }
};

export default connectDB;
