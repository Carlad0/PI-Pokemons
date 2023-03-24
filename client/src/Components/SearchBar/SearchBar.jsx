import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    useEffect (() => {
        return () => setName('');
    },[])

    const handlerInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
        console.log(name);
    }
    
    const handlerSubmit = (event) => {
        event.preventDefault();
        dispatch(getNamePokemon(name))
    }


    return(
        <div>
            <input
            type = "text"
            placejolder = "Search ..."
            onChange={handlerInputChange}
            />
            <button type='submit' onClick={handlerSubmit}>Search</button>
        </div>
    )
}

export default SearchBar;