import express from "express";
import dotenv from "dotenv";

import path from "path";
import PlantRouter from "./routes/PlantRoute";
import { AppDataSource } from "./data-source";
import bodyParser = require("body-parser");
import cors from "cors";

// Init environment variables (see .env.local file if it doesn't exist go to README.md file)
dotenv.config({ path: ".env.local" });

AppDataSource.initialize()
  .then(async () => {
    // Express server creation
    const app = express();
    const port = process.env.PORT || 8080;
    app.use(cors());
    app.use(bodyParser.json());
    // Set a static folder for assets
    app.use(
      "/assets",
      express.static(path.join(__dirname, "../public/assets"))
    );

    /************************************************
     * Data's routes
     */
    app.use("/api/plant", PlantRouter);

    // Bind express server on port 3004
    app.listen(port, () => {
      console.log(
        `Express server has started on port ${port}. Open http://localhost:${port} to see results`
      );
    });
  })
  .catch((error) => console.log(error));
