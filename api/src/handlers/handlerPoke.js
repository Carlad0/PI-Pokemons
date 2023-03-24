const { getAllInfo,createPokemon } = require('../controllers/controllerPoke');


const handlerGetPokemons = async (req, res) => {    
    try {
        const { name } = req.query;
        const pokemonsTotal = await getAllInfo()
        if(!name) {
            res.status(200).json(pokemonsTotal)
        }
        if(name) {
            const poke = pokemonsTotal.filter(el => el.name === name)
            if(poke.length) res.status(200).json(poke)
        }
    
    } catch (error) {
    
        res.status(400).json({error: error.message})
    }
};

const handlerGetPokemonsId = async (req, res) => {
    const idPokemon = req.params.idPokemon;
    const pokemonsTotal = await getAllInfo()
    if(idPokemon){
        const poke = await pokemonsTotal.filter(el => el.id == idPokemon)
        poke.length?
        res.status(200).json(poke) :
        res.status(400).send('No pokemon')
    };
};

const handlerCreatePokemon = async (req, res) => {
    
    try {
        let { name, image, life, attack, defense, types} = req.body
       
        if (!name) throw Error('missing name')
        if (!image) throw Error('missing image')
        if (!life) throw Error('missing life')
        if (!attack) throw Error('missing attack')
        if (!defense) throw Error('missing defense')

        const newPokemon = await createPokemon(name, image, life, attack, defense, types);
        
        res.status(200).json(newPokemon);

    } catch (error) {
    res.status(400).json({error: error.message})
    }
}

const protected = (req, res) => {
    res.send('This is a protected route')
}

const unprotected = (req, res) => {
    res.send('This is an unprotected route')
}

module.exports = {
    handlerCreatePokemon,
    handlerGetPokemons,
    handlerGetPokemonsId,
    protected,
    unprotected
}