export default {
    type: 'object',
    properties: {
      name: { type: 'string', format: 'nonEmptyOrBlank' },
      description: { type: 'string', format: 'nonEmptyOrBlank' },
      brandId: { type: 'number', format: 'numberString' },
    },
    required: ['name', 'description'],
  };
  