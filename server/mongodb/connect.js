import mongoose from "mongoose";

const connectDB = (url) => {
  // * This allows us to set up search functionality
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
