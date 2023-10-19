import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import colorRoutes from "./routes/colorRoutes.js";
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/colors", colorRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
