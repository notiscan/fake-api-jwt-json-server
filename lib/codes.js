const codes = {
  invalidParams: {
    status: 406,
    message: 'missing parameters'
  },
  unauthorized: {
    status: 401,
    message: 'unauthorized access'
  },
  revokedToken: {
    status: 401,
    message: 'Error accessToken is revoked'
  },
  badToken: {
    status: 401,
    message: 'Error in authorization format'
  }
};

module.exports = codes;
