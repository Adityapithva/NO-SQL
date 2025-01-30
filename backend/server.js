const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configs/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/",(req,res) => {
    res.send("Welcome to Blog API");
});

app.use("/user",userRoutes);

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});