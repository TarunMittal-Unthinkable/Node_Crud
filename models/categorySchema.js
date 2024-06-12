export default {
    type: 'object',
    properties: {
      name: { type: 'string', format: 'nonEmptyOrBlank' },
      description: { type: 'string', format: 'nonEmptyOrBlank' },
      productId: { type: 'number', format: 'numberString' },
      colors: { type: 'string', format: 'nonEmptyOrBlank' },
      totalQty: { type: 'number', format: 'numberString' },
      totalSold: { type: 'number', format: 'numberString' },
      sizes: { type: 'string', format: 'nonEmptyOrBlank',enum:["S","M","L","XL","XXL"]},
      priceperquantity: { type: 'number'},
    },
    required: ['name', 'description'],
  };