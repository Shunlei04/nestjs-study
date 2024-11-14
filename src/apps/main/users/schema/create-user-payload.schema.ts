export const ajvCreateUserPayloadSchema = {
  type: 'object',
  required: ['username', 'password'],
  additionalProperties: false,
  properties: {
    username: {
      type: 'string',
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },

  // for ajv errors
  errorMessage: {
    required: {
      username: 'Username is required',
      password: 'Password is required',
    },
    additionalProperties: 'Only username and password are accepted',
    properties: {
      username: 'Username must be a string with min length 3',
      password: 'Password must be a string with min length 6',
    },
  },
};
