import knex from 'knex';
import connectDB from './knexfile.js';
const environment = process.env.NODE_ENV || 'development';
const config = connectDB[environment];

export default knex(config);