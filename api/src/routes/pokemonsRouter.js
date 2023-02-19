const { Router } = require('express');
const pokemonsRouter = Router();
const { getPokemonsHandler, createPokemonHandler, getPokemonsIdHandler} = require('../handlers/pokemonsHandlers')


pokemonsRouter.get('/', getPokemonsHandler);

//Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.

// X- Debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
// X- Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// X- Si no existe el pokemon, debe mostrar un mensaje adecuado.
// X- Debe buscar tanto los de la API como los de la base de datos.


pokemonsRouter.get('/:idPokemon', getPokemonsIdHandler);
// obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
// El pokemon es recibido por parámetro (ID).
// Tiene que incluir los datos del tipo de pokemon al que está asociado.
// Debe funcionar tanto para los pokemones de la API como para los de la base de datos.

pokemonsRouter.post('/', createPokemonHandler);
// Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (al menos uno).



module.exports = pokemonsRouter;