// import style from './Home.module.css';
import CardContainer from "../../Components/CardContainer/CardContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterByTypes, filterCreated } from "../../redux/actions";
import SearchBar from '../../Components/SearchBar/SearchBar';
import Order from "../../Components/Order/Order";

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

    const handleLoad = (event) => {
        dispatch(getPokemons())
    }

    return (
        <div> 
            <Order />
            <select name='filter' onChange={handleFilterTypes}>
                <option value="all">All Types</option>
                {types.map((tipo, index) => (
                    <option value={tipo} key={index}>{tipo}</option>
                    ))} 
            </select> 

            <select onChange={handleCreated}>
                <option value="all">All Pokemons</option>
                <option value="created">My Pokemons</option>
                <option value="api">Api Pokemons</option>
            </select>

            <SearchBar />
            <button onClick={handleLoad}>Load All</button>
            <CardContainer />
        </div>
    )
}

export default Home;