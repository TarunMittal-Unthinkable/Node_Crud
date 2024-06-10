import _ from 'lodash';
const successResponse = (res, status, message,code, data = null) => {
  const response = {
    success: true,
    message: message,
    code:code
  };
  if (!_.isEmpty(data)) {
    response.data = data;
  }
  return res.status(status).json(response);
};

export default {successResponse} ;
