import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import config from "config";
import ApiError from "./api-error.js";
import errors from "./errors.js";
import logger from "./logger.js";

import knex from "../knex.js";

/**
 * Express error handler middleware.
 * Should be the last middleware used.
 *
 * @param {Error|*} err Error value
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {Function} next Next function
 */
async function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    // end if headers have already been sent
    res.end();
  } else {
    // send error
    if (err instanceof ApiError) {
      console.log("====ApiError==");
      // send API error
      logger.error(errorFormatter(err, req));
      const errorId = await saveErrorLogs(err, req);
      err.errorId = errorId;
      console.log("errorrrrrrr", errorId);
      err.send(res);
    } else {
      // log internal error
      logger.error(errorFormatter(err, req));
      const errorId = await saveErrorLogs(err, req);

      // send default API error
      const details = inspectDetail(err);
      const defaultError = errors.INTERNAL(details);
      defaultError.errorId = errorId;
      defaultError.send(res);
    }
  }
}

/**
 * Inspect err object and return related error detail if any.
 *
 * @param {*} err - error to inspect.
 * @return {Object} error details, or undefined.
 */
function inspectDetail(err) {
  if (err instanceof Error && _.has(err, "message")) {
    return err.message;
  }

  // return default detail
  return "Unknown Error";
}

function errorFormatter(err, req) {
  if (req.headers.authorization) {
    delete req.headers.authorization;
  }

  const errorObj = {
    errorId: uuidv4(),
    url: req.url,
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body,
    errorMessage: err.message,
  };

  if (req.user) {
    errorObj.userId = req.user.userId;
  }

  err.errorObj = JSON.stringify(errorObj);
  return err;
}

async function saveErrorLogs(err, req) {
  console.log("====saveErrorLogs==");
  const uuid = uuidv4();
  if (!process.env.enableSavingErrorLog) {
    return;
  }

  await knex("logs").insert({
    uuid,
    details: { ...errorFormatter(err, req), errorStacK: err.stack },
  });

  return uuid;
}

export default errorHandler;
