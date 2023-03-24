const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa')
const {auth} = require('express-oauth2-jwt-bearer')
const axios = require ('axios')
const cors = require('cors')

require('./db.js');

const server = express();

server.name = 'API';


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Credentials', 'authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const verifyJwt = auth({
  audience: 'pokemon identifier',
  issuerBaseURL: 'https://dev-a5lp6h1utxb70h27.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

//+++++++++++++COMO HIZO EL INDIO+++++++++++++++++++++++++++++++++++++
// const verifyJwt = (req, res, next) => {
//   const { headers: { authorization } } = req;
//   if (authorization && authorization.split(' ')[0] === 'Bearer') {
//     const token = authorization.split(' ')[1];
//     try {
//       const decodedToken = jwt.verify(token, jwksClient.getSigningKey);
//       req.user = decodedToken;
//       next();
//     } catch (err) {
//       res.status(401).send('Invalid Token');
//     }
//   } else {
//     res.status(401).send('No token provided');
//   }
// };

// const jwksClient = jwks({
//   jwksUri: 'https://dev-a5lp6h1utxb70h27.us.auth0.com/.well-known/jwks.json',
//   cache: true,
//   rateLimit: true,
//   jwksRequestsPerMinute: 5,
// });


server.get('/pokemons/unprotected', (req, res) => {
  res.send('This is an unprotected route');
});

server.use(verifyJwt);


//++++++++++++++++++++RUTA PROTEGIDA+++++++++++++++++++++
// server.get('/pokemons/protected', async (req, res) => {
//   try {
//     console.log(req.auth);
//     const response = await axios('https://dev-a5lp6h1utxb70h27.us.auth0.com/userinfo',
//     {
//       headers: {
//         authorization: `Baerer ${req.auth.token}`
//       }
//     })
//     res.status(200).json(response.data)
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// server.use((req, res, next) => {
//   const error = new Error('not found');
//   error.status = 404;
//   next(error);
// });

// server.use((error, req, res, next) => {
//   const status = error.status || 500;
//   const message = error.message || 'internal server error';
//   res.status(status).send(message);
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
