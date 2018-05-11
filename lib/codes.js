const codes = {
  invalidParams: {
    status: 406,
    message: 'Missing parameters'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized access'
  },
  revokedToken: {
    status: 401,
    message: 'Error accessToken is revoked'
  },
  badToken: {
    status: 401,
    message: 'Error in authorization format'
  },
  badRequest: {
    status: 400,
    message: 'Bad request'
  },
  serverError: {
    status: 500,
    message: 'Internal server error'
  },
  duplicateError: {
    status: 500,
    message: 'Duplicate error'
  },
  accountCreated: {
    status: 201,
    message: 'Account created'
  }
};

module.exports = codes;
