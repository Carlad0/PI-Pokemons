const {
    getAllPokemons,
    getPokemonsByName,
    getPokemonsById,
    createPokemon
} = require('../controllers/pokemonsController');

const getPokemonsHandler = async (req, res) => {
    try {
        const { name } = req.query;
        
        if(!name) {
            let pokemonSearch = await getAllPokemons()
            res.status(200).json(pokemonSearch)
        }
        if(name) {
            let pokemonSearch = await getPokemonsByName(name);
            res.status(200).json(pokemonSearch)
        }        
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getPokemonsIdHandler = async (req, res) => {
    const { idPokemon } = req.params;

    const source = isNaN(idPokemon) ? "bdd" : "api";
    try {
        if(idPokemon >= 10000) throw new Error (`${idPokemon} is not a Pokemon`)
        const pokemon = await getPokemonsById(idPokemon, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


const createPokemonHandler = async (req, res) => {
    
    const { 
        name,
        image,
        life,
        attack,
        defense,
        types
    } = req.body;
    try {
    

    if (!name) throw Error('missing name')
    if (!image) throw Error('missing image')
    if (!life) throw Error('missing life')
    if (!attack) throw Error('missing attack')
    if (!defense) throw Error('missing defense')
    
        const pokemon = await createPokemon(name, image, life, attack, defense)

        res.status(200).json(pokemon);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};



module.exports = {
    getPokemonsHandler,
    createPokemonHandler,
    getPokemonsIdHandler
};