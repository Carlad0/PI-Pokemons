import { GET_POKEMONS, GET_TYPES, POST_POKEMONS, SET_STATE_PAGES, FILTER_TYPES, FILTER_CREATED, GET_NAME_POKEMONS, GET_POKEMON_DETAIL } from "./actionTypes";

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: [],
    types: [],
    currentDisplayedPokemons: []
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
            const typesFiltered = allPokemons.filter(el => el.types.includes(action.payload)) 
            return {
                ...state,
                pokemons: typesFiltered
            }
        case FILTER_CREATED:
            // const allPokemons1 = state.allPokemons
            // const createdFilter = allPokemons1.filter(el => (el.name === 'carlos'))
            const createdFilter = action.payload === 'created' ? state.allPokemons.filter(el => isNaN(el.id))  : state.allPokemons.filter(el => !isNaN(el.id))
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
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;

