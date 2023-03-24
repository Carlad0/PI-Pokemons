import { GET_POKEMONS, GET_TYPES, POST_POKEMONS, SET_STATE_PAGES, FILTER_TYPES, FILTER_CREATED, GET_NAME_POKEMONS, GET_POKEMON_DETAIL, SORT_POKEMONS_ATTACK } from "./actionTypes";
import { ASCENDENT_ATTACK, ASCENDENT_NAME } from "../constantes/sort";

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: [],
    types: [],
    currentDisplayedPokemons: [],
    // filteredPokemons: []
};



const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case POST_POKEMONS:
            return {
                ...state
            }
        case SET_STATE_PAGES:
            return {
                ...state,
                currentDisplayedPokemons: action.payload.value
            }
        case FILTER_TYPES:
            const allPokemons = state.allPokemons
            const typesFiltered = action.payload !== 'all' 
            && allPokemons.filter(el => el.types.includes(action.payload)) 
            return {
                ...state,
                pokemons:  action.payload === 'all' ? state.allPokemons :typesFiltered
            }
        case FILTER_CREATED:
            // const allPokemons1 = state.allPokemons
            // const createdFilter = allPokemons1.filter(el => (el.name === 'carlos'))
            const createdFilter = action.payload === 'created' 
            ? state.allPokemons.filter(el => isNaN(el.id))  
            : state.allPokemons.filter(el => !isNaN(el.id))
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
            }
        case GET_NAME_POKEMONS:

        return {
            ...state,
            pokemons: action.payload
        }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case SORT_POKEMONS_ATTACK:
            let orderByName = [...state.pokemons]
            orderByName = orderByName.sort((a, b) => {
                if(action.payload.includes("NAME")){
                    if (a.name > b.name){
                        return (action.payload === ASCENDENT_NAME ? 1 : -1);
                    }
                    if (a.name < b.name){
                        return (action.payload === ASCENDENT_NAME ? -1 : 1);
                    }
                    return 0
                } else {
                    if (a.attack > b.attack){
                        return (action.payload === ASCENDENT_ATTACK ? 1 : -1);
                    }
                    if (a.attack < b.attack){
                        return (action.payload === ASCENDENT_ATTACK ? -1 : 1);
                    }
                    return 0
                }
                
            })
            return {
                ...state,
                pokemons: orderByName
            }
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;

