import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log("Connect Db");
} catch (error) {
  console.log("Error de conexion");
}
