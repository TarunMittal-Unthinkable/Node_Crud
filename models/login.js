export default {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'nonEmptyOrBlank' },
  },
  required: ['email', 'password'],
};
