import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import { readFileSync } from 'fs';
import path from 'path';
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from './routes/brandRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userProductRoutes from './routes/userProductRoutes.js';
import errorHandler from "./lib/error-handler.js";
import knex from "./knex.js";
import error from "./lib/errors.js";
import jsonParser from "./lib/json-parser.js";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import client from "./lib/redisClient.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Database Migration
async function init() {
  app.use(cors({ exposedHeaders: ['Authorization'] }));
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


  // // Redis-Server Connection
  // client.on('error', (err) => {
  //   console.log('Redis Client Error', err);
  // });
  // client.on('ready', () => console.log('Redis is ready'));

  // await client.connect();
  // await client.ping();

  // Swagger API-DOCUMENTATION Setup
  const stringifiedSwaggerDoc = readFileSync(
    path.resolve('apiDoc/swagger.json'),
    'utf8',
  );
  const swaggerDocument = JSON.parse(stringifiedSwaggerDoc);
  app.use(
    '/api/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );

  //JSON validation
  app.use(jsonParser());

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/brand", brandRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/review", reviewRoutes);
  app.use("/api/user/products", userProductRoutes);


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
