import _ from 'lodash';
import constant from '../constant/success-response.js'
const successResponse = (res, message, data = null) => {
  const response = {
    success: true,
    message: message
  };
  if (!_.isEmpty(data)) {
    response.data = data;
  }
  return res.status(constant.SUCCESS_STATUS).json(response);
};

export default successResponse;
