import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
//import userRecordRoutes from './routes/userRecordRoutes.js';
import errorHandler from "./lib/error-handler.js";
import knex from "./knex.js";
import error from "./lib/errors.js";
import jsonParser from "./lib/json-parser.js";


const app = express();
const PORT = process.env.PORT || 3000;

// Database Migration
async function init() {
  await knex.migrate 
    .latest()
    .then(() => {
      console.log("Database migration successful");
    })
    .catch((error) => {
      console.error("Failed to migrate database:", error);
      process.exit(1);
    });
  knex.on("query", (queryData) => console.log("\n" + queryData.sql));

  //JSON validation
  app.use(jsonParser());
  app.use("/api/users", userRoutes);
  //app.use("/user/records", userRecordRoutes);


  // Error handling
  app.use(() => {
    throw error.NOT_FOUND();
  });
  app.use(errorHandler);

  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

init().catch((e) => {
  console.log("=====eeeee=", e);
  throw e;
});
