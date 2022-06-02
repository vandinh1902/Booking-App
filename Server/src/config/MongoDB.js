import mongoose from "mongoose";

const connectData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {

    console.error(`Error: ${error.message}`);
    process.exit(1);
    
  }
};

export default connectData;
