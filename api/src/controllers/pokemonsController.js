const { Pokemon, Type } = require("../db.js");
const axios = require('axios');
const { getApiTypes } = require('./typesControllers');

const urlGetPokemonByNameOrId = 'https://pokeapi.co/api/v2/pokemon/'
const urlGetAllPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=';
const limitValue = 3; 

const cleanArray = (arr) =>
    arr.map(element =>{
        return {
            id: element.id,
            name: element.name,
            image: element.sprites.front_default,
            life: element.stats[0].base_stat,
            attack: element.stats[1].base_stat,
            defense: element.stats[2].base_stat,
            types: element.types.map(tipos => tipos.type.name)
        }
    }
);
//----------------------------------------------


const getAllPokemons = async () => {
    let db = await getAllDatabasePokemons();
    let api = await getAllApiPokemons();
    
    return db.concat(api);
};

    const getAllDatabasePokemons = async () => {

        const databasePokemons = await Pokemon.findAll({ include: [Type] });
        return databasePokemons;
    };

    const getAllApiPokemons = async () => {

        const apiPokemonsFirstRaw = (await axios.get(`${urlGetAllPokemon}${limitValue}`)).data.results;
        
        const eachPokemon = [];
        apiPokemonsFirstRaw.map(pokemon => eachPokemon.push(axios.get(pokemon.url).then(response => response.data)));
        const apiPokemons = Promise.all(eachPokemon).then(response => cleanArray(response));
        
        return apiPokemons;
    };
    

const getPokemonsByName = async (name) => {

    //devuelve un array con las 2 busquedas
    // try {
    //     const dbName = await getPokemonsByNameDatabase(name);
    //     const apiName = await getPokemonsByNameApi(name);
    //     const allName = [dbName, apiName];
    //     return allName;
        
    // } catch (error) {
    //     return error.message;
    // }

    //devuelve el objeto que corresponde

    try {
        const dbName = await getPokemonsByNameDatabase(name);
        const apiName = await getPokemonsByNameApi(name);
        const allName = {};
        if(!apiName.hasOwnProperty('name')) {
            return dbName;
        } else {
            return apiName;
        }

    } catch (error) {
        return ('Pokemon not found');
    }



};

    const getPokemonsByNameDatabase = async (name) => {
        try {
            const nameLower = name.trim().toLowerCase(); //Lo busco en DB con minuscula ya que así lo almacené
    
            const pokemonDatabase = await Pokemon.findOne({
            where: { name: nameLower }
            // ,
            // include: Type,
            })
            if(!pokemonDatabase) throw new Error ("Pokemon name doesn't exist in DB");
            return  pokemonDatabase;        
            
        } catch (error) {
            return error.message;
        }
    }

    const getPokemonsByNameApi = async (name) => {

        try {
            const nameLower = name.trim().toLowerCase(); //Lo busco en DB con minuscula ya que así lo almacené
            
            const responseArray = [];
            const pokemonRaw = (await axios.get(`${urlGetPokemonByNameOrId}${nameLower}`)).data
            responseArray.push(pokemonRaw);
            
            let pokemonApi = cleanArray(responseArray);
            
            if(!pokemonApi.length) throw new Error ("Pokemon name doesn't exist in Api");
            return pokemonApi[0];
            
        } catch (error) {
            return "Pokemon name doesn't exist in Api";
        }


    };

    

        

    
const getPokemonsById = async (pokemonID, source) => {
    try {
        
        if(source === 'api'){    
            const responseArray = [];
            const pokemonRaw = (await axios.get(`${urlGetPokemonByNameOrId}${pokemonID}`)).data
            responseArray.push(pokemonRaw);
            let pokemon = cleanArray(responseArray);
            
            return pokemon[0];
        }
        
        if (source === "bdd") {
            let pokemon = await Pokemon.findByPk(pokemonID, {include: {
                model: Type,
                attributes: ['id', 'name']
            }}) 
            return pokemon;
        } 
    } catch (error) {
        return ('idPokemon not found'); 
    }
};

const createPokemon = async (name, image, life, attack, defense, types) => {
    // try {
    
    let typeStored = await Type.findAll({ where: { name: types }});
    if(!typeStored.lengthh) {
        await getApiTypes();
        typeStored = await Type.findAll({ where: { name: types }});
    }
console.log(typeStored);

    let checkNameObj = await getPokemonsByName(name);
    let checkName = Object.values(checkNameObj)[1].name;
    console.log(checkName);

        if(checkName === name) {
            throw new Error('Name already exist');
        // } else if (!typeStored.length) {
        //     throw new Error("type doesn't exist")
        } else{       


        const newPokemon = await Pokemon.create({ name, image, life, attack, defense });


        newPokemon.addType(types)
        return newPokemon;
        }
        
    // } catch (error) {
    //     return "Ya esta creado"
    // }
};



module.exports = { getAllPokemons, getPokemonsByName, getPokemonsById, createPokemon };