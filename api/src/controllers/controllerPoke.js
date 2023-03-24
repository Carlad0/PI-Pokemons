const axios = require('axios');
const { Pokemon, Type } = require("../db.js");


const cleanArray = (arr) =>
arr.map(element =>{
        return {
            id: element.id,
            name: element.name,
            image: element.sprites.front_default,
            life: element.stats[0].base_stat,
            attack: element.stats[1].base_stat,
            defense: element.stats[2].base_stat,
            types: element.types
            .map(tipos => tipos.type.name)
        }
    }
);
const cleanArrayDB = (arr) =>
    arr.map(element =>{
        return {
            id: element.id,
            name: element.name,
            image: element.image,
            life: element.life,
            attack: element.attack,
            defense: element.defense,
            types: element.Types
            .map(tipos => tipos.name)
        }
    }
);

const getAllApi = async () => {
    const apiPokemonsFirstRaw = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")).data.results;
    const eachPokemon = [];
        apiPokemonsFirstRaw.map(pokemon => eachPokemon.push(axios.get(pokemon.url).then(response => response.data)));
        const apiPokemons = Promise.all(eachPokemon).then(response => cleanArray(response));
        
        return apiPokemons;
    };

const getDbInfo = async () => {
    const dataRaw = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    dataPokemon = cleanArrayDB(dataRaw);
    return dataPokemon;
}

const getAllInfo = async () => {
    const apiInfo = await getAllApi();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


const createPokemon = async (name, image, life, attack, defense, types) => {

    let nameLower = name.trim().toLowerCase();

    const newPokemon = await Pokemon.create({
        name: nameLower,
        image,
        life,
        attack,
        defense
    });

    const dbTypes = await Type.findAll({ where: { name: types } });

    await newPokemon.setTypes(dbTypes);
    
    return newPokemon;
}

module.exports = {
    getAllInfo, 
    createPokemon
};