// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sort } from "../../redux/actions";
import { ASCENDENT_NAME,
    DESCENDENT_NAME,
    ASCENDENT_ATTACK,
    DESCENDENT_ATTACK } from "../../constantes/sort"

const Order = () =>{

    const dispatch = useDispatch();

    const onSelectChange = (event) => {
        event.preventDefault()  
        dispatch(sort(event.target.value))
    }

    return(
        <fieldset>
            <legend>Select sort by Name or Attack</legend>
            <select name="selectName" onChange={onSelectChange} value="none">
                <option value="none" > Sort </option>
                <option value={ASCENDENT_NAME}>Name from A to Z</option>
                <option value={DESCENDENT_NAME}>Name from Z to A</option>
                <option value={DESCENDENT_ATTACK}>From most powerful</option>
                <option value={ASCENDENT_ATTACK}>From least powerful</option>
            </select>
        </fieldset>            
    );
};

export default Order;