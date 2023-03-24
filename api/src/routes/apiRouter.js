const { Router } = require('express');
const apiRouter = Router();
const axios = require('axios');

apiRouter.get('/protected',  async (req, res) => {
    try {
      console.log(req.auth);
      const response = await axios('https://dev-a5lp6h1utxb70h27.us.auth0.com/userinfo',
      {
        headers: {
          authorization: `Bearer ${req.auth.token}`
        }
      })
      res.status(200).json(response.data)
    } catch (error) {
      console.log(error.message);
    }
  })

module.exports = apiRouter;