function errorResponse(res, status, message,code){
    const response = {
        isError: true,
        message: message,
        code:code
      };
    return res.status(status).json(response);

}
export default errorResponse