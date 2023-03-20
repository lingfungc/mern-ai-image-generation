import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// * This allow us to pool our environment variables from ".env" file
dotenv.config();

const app = express();

// app.use(cors());

// const corsOptions = { origin: "https://lfc-ai-gallery.netlify.app" };
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: "https://lfc-ai-gallery.netlify.app",
  })
);

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
//   })
// );

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// * The "async" tells "node.js" to run tasks at the same time without waiting the previous one to finish
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
