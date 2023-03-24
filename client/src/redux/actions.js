import axios from "axios";
import {GET_POKEMONS,
    GET_TYPES,
    POST_POKEMONS,
    FILTER_TYPES,
    SET_STATE_PAGES,
    FILTER_CREATED,
    GET_NAME_POKEMONS,
    GET_POKEMON_DETAIL,
    SORT_POKEMONS_ATTACK } from "./actionTypes";




export const getPokemons = () => {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/pokemons");
        const pokemons = res.data
        dispatch({ type: GET_POKEMONS, payload: pokemons})
    };
};

export function getTypes() {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: GET_TYPES,
            payload: res.data
        });
    };
};


export function postPokemons(payload) {
    return async function(dispatch) {
        try {
        const res = await axios.post('http://localhost:3001/pokemons', payload)
        const data = res.data;
        alert('new Pokemon was born!!')
        return {
            type: POST_POKEMONS,
            payload: data
        }}
        catch (error) {
            const result = error.response.data.error
            console.log(result);
            alert(result);
        }
    };
};

export function updateStatePaginate (value) {
    return {
        type: SET_STATE_PAGES,
        payload: {value}
    };
};

export function filterByTypes(type) {
    console.log(type);
    return {
        type: FILTER_TYPES,
        payload: type
    }
};

export function filterCreated(id) {
    console.log(id);
    return {
        type: FILTER_CREATED,
        payload: id
    }
};

export function getNamePokemon(name){
    return async function (dispatch) {
        try {
            let res = await axios.get("http://localhost:3001/pokemons?name=" + name) 
            return dispatch ({ type: GET_NAME_POKEMONS, payload: res.data})
            
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetailPokemon(idPokemon){
    return async function (dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`)
            return dispatch({ type: GET_POKEMON_DETAIL, payload: res.data })
        } catch (error) {
            console.log(error);   
        }
    }
}

export function sort(order) { //ASCENDENTE o DESCENDENTE
    return {
        type: SORT_POKEMONS_ATTACK,
        payload: order, // ASCENDENTE o DESCENDENTE
    };
}