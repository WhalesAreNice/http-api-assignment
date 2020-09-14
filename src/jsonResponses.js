const respondJSON = (request, response, status, object, types) => {
  let responseXML;

  if (types[0] === 'text/xml') {
    responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    response.writeHead(status, { 'Content-Type': 'text/xml' });
  } else {
    responseXML = JSON.stringify(object);
    response.writeHead(status, { 'Content-Type': 'application/json' });
  }
  response.write(responseXML);
  response.end();
};

const success = (request, response, types) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON, types);
};

const badRequest = (request, response, types, params) => {
  const responseJSON = {
    message: 'This request has the required query parameters',
    id: 'badRequest',
  };

  if (params.valid === 'true') {
    respondJSON(request, response, 200, responseJSON, types);
  } else {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    respondJSON(request, response, 400, responseJSON, types);
  }
};

const unauthorized = (request, response, types, params) => {
  const responseJSON = {
    message: 'loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  if (params.loggedIn === 'yes') {
    respondJSON(request, response, 200, responseJSON, types);
  } else {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    respondJSON(request, response, 401, responseJSON, types);
  }
};

const forbidden = (request, response, types) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON, types);
};

const internal = (request, response, types) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  respondJSON(request, response, 500, responseJSON, types);
};

const notImplemented = (request, response, types) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON, types);
};

const notFound = (request, response, types) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON, types);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
