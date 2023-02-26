import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// * This allow us to pool our environment variables from ".env" file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// * The "async" tells "node.js" to run tasks at the same time without waiting the previous one to finish
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  app.listen(8080, () =>
    console.log("Server has started on port http://localhost:8080")
  );
};

startServer();
