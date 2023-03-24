/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import Card from "../Card/Card";
import style from './CardContainer.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions";

const CardContainer = () => {

	const dispatch = useDispatch();
	const pokemons = useSelector(state => state.pokemons)

	useEffect(()=> {
        dispatch(getPokemons());
    }, [dispatch])

	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOffFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemon = pokemons.slice(indexOffFirstPokemon, indexOfLastPokemon);


	const handlerPageClick =(event) => {
		setCurrentPage(Number(event.target.id))
	}

	const pages = []
	for (let i = 1; i <= Math.ceil(pokemons.length/pokemonsPerPage); i++) {
        pages.push(i);      
    }

	const renderPageNumbers = pages.map((number) => {
		return (
			<li className={style.pageNumbers_li} key={number}>
				<a key={number} id={number} onClick={handlerPageClick}>
					{number}
				</a>
			</li>
		)
	}) 

	return(
		<div>
			<div>		
				<ul className={style.pageNumbers}>{renderPageNumbers}</ul>
			</div>
			<div className={style.container}>
				{currentPokemon.map(pokemon => {
					return <Card
						key={pokemon.id}
						image= {pokemon.image}
						name= {pokemon.name}
						types={pokemon.types}
						id={pokemon.id}
						/>
				})}
			</div>

		</div>
	)   
}

export default CardContainer;