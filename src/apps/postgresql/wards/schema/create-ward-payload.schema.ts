export const ajvCreateWardPayloadSchema = {
  type: 'object',
  required: ['wardName'],
  additionalProperties: false,
  properties: {
    wardName: {
      type: 'string',
      minLength: 3,
      maxLength: 24,
    },
  },

  // for ajv errors
  errorMessage: {
    required: {
      wardName: 'WardName is required',
    },
    additionalProperties: 'Accept only watdName',
    properties: {
      wardName: 'WardName must be a string with min length 3 and max length 24',
    },
  },
};
