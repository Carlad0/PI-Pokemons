// import style from './Home.module.css';
import CardContainer from "../../Components/CardContainer/CardContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterByTypes, filterCreated } from "../../redux/actions";
import SearchBar from '../../Components/SearchBar/SearchBar';




const Home = () => {

    const types = useSelector(state => state.types)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPokemons());
        dispatch(getTypes())
    }, [dispatch])

    const handleFilterTypes = (event) => {
        dispatch(filterByTypes(event.target.value));

    }

    const handleCreated = (event) => {
        dispatch(filterCreated(event.target.value));

    }

    return (
        <div> 
            <div>
                <select>
                    <option value="asc">Ascending</option>
                    <option value="dsc">Descending</option>
                </select> 
            </div>
            <div>
                <select name='filter' onChange={handleFilterTypes}>
                    {types.map(tipo => (
                            <option value={tipo}>{tipo}</option>
                        ))} 
            </select> 
            <div>
                <select onChange={handleCreated}>
                    <option value="all">All</option>
                    <option value="created">My Pokemons</option>
                    <option value="api">Api Pokemons</option>
                </select>
                {/* <button onClick={handleCreated} value="created">Propios</button> */}
            </div>
            <div>
                <SearchBar></SearchBar>
            </div>
            <div> 
                <CardContainer></CardContainer>
            </div>
            </div>
        </div>
    )
}

export default Home;