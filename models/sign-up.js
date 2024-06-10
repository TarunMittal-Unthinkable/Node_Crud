export default {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
    first_name: { type: 'string'}, 
    last_name: { type: 'string'}, 
    dob: { type: 'string', format: 'date' }, 
    phone_no: { type: 'string', format: 'mobileNumber' }, 
    gender: { type: 'string'},
  },
  required: ['email', 'password','phone_no'],
};
