import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/Product.routes.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // to parse the json data from the frontend

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running");
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running http://localhost:${PORT}`);
})

