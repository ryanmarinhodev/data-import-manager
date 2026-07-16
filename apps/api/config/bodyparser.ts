const bodyParserConfig = {
  whitelistedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  json: {
    encoding: 'utf-8',
    limit: '1mb',
    strict: true,
    types: ['application/json'],
  },
  form: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
  },
  raw: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: ['text/*'],
  },
  multipart: {
    autoProcess: true,
    processManually: [],
    encoding: 'utf-8',
    fieldsLimit: '2mb',
    limit: '20mb',
    types: ['multipart/form-data'],
  },
}

export default bodyParserConfig
