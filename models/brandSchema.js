export default {
    type: 'object',
    properties: {
      name: { type: 'string', format: 'nonEmptyOrBlank' },
      description: { type: 'string', format: 'nonEmptyOrBlank' },
    },
    required: ['name', 'description'],
  };
  