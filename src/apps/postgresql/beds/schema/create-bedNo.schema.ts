export const ajvCreateBedNoSchema = {
  type: 'object',
  required: ['bedNo', 'wardId'],
  additionalProperties: false,
  properties: {
    bedNo: {
      type: 'string',
      minLength: 3,
      maxLength: 24,
    },
    wardId: {
      type: 'number',
    },
  },

  // for ajv errors
  errorMessage: {
    required: {
      bedNo: 'bedNo is required',
      wardId: 'wardId is required',
    },
    additionalProperties: 'Accept only bedNo',
    properties: {
      bedNo: 'bedNo must be a string with min length 3 and max length 24',
      wardId: 'wardId must be a string with min length 3 and max length 24',
    },
  },
};
