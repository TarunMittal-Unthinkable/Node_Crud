export default {
    type: 'object',
    properties: {
      rating: { type: 'number', format: 'numberString',enum:[1,2,3,4,5] },
      message: { type: 'string', format: 'nonEmptyOrBlank' },
      categoryId: { type: 'number', format: 'numberString' },
    },
    required: ['rating', 'message'],
  };
