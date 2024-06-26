export default {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'nonEmptyOrBlank' },
    nonce:{type: 'string'}
  },
  required: ['email', 'password'],
};
