import _ from "lodash";
import tv4 from "tv4";
import errors from "./errors.js";
import tvFomat from "./tv4-formats.js";
// add formats
tv4.addFormat(tvFomat);

/**
 * Validate data against schema.
 * Throws API error if data is invalid.
 *
 * @param {*} data data to validate.
 * @param {object} schema tv4 schema object.
 */
export default function validate(data, schema) {
  // validate
  const result = tv4.validateResult(data, schema, false, true);

  // proceed if valid
  if (result.valid) {
    return;
  }

  // extract error message
  let message;
  if (_.has(result.error, "dataPath") && result.error.dataPath.length) {
    message = `${result.error.message} at ${result.error.dataPath}`;
  } else {
    
    message = result.error.message;

  }

  // send validation error with message
  throw errors.INVALID_INPUT(message);
}
