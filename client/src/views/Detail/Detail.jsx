/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailPokemon } from "../../redux/actions";
import { useParams } from 'react-router';

const Detail = () => {
    
    const dispatch = useDispatch();
    
    const pokemonDetail = useSelector(state => state.pokemonDetail)
    const {idPokemon} = useParams()

    useEffect (() => {
        dispatch(getDetailPokemon(idPokemon));
    }, [dispatch])

    
    return (
        <div>
            <h1>Vista de Detail</h1>
            {
                (pokemonDetail.length) ? pokemonDetail.map(el => 
                <div>
                    <img src={el.image} alt={el.name} />
                    <h1>My name is: {el.name}</h1>
                    <h1>My ID is: {el.id}</h1>
                    <h1>My helth power is: {el.life}</h1>
                    <h1>I will attack with: {el.attack}</h1>
                    <h1>And will defend with: {el.defense}</h1>
                    <div>My types are: 
                        {el.types.map(type => <div>{type}</div>)}
                    </div>
                </div>)
                : <p>Pokemon not found...</p>
            }
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
        </div>
    )
}

export default Detail;