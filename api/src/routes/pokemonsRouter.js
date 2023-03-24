const { Router } = require('express');
const pokemonsRouter = Router();
const { handlerCreatePokemon, handlerGetPokemons, handlerGetPokemonsId, unprotected, protected } = require('../handlers/handlerPoke');

// pokemonsRouter.get('/unprotected', unprotected);
// pokemonsRouter.get('/protected', protected);

// pokemonsRouter.use((req, res, next) => {
//     const error = new Error('not found');
//     error.status = 404;
//     next(error);
// })

// pokemonsRouter.use((error, req, res, next) => {
//     const status = error.status || 500
//     const essage = error.message || 'internal server error'
//     res.status(status).send(message);
// });


    
pokemonsRouter.get('/', handlerGetPokemons);

pokemonsRouter.get('/:idPokemon', handlerGetPokemonsId);

pokemonsRouter.post('/', handlerCreatePokemon);




    
module.exports = pokemonsRouter;
    

