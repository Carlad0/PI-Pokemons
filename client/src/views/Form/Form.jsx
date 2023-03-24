// import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemons } from "../../redux/actions";

const validate = (form) => {
    const errores = {}
    if(form.name === "") errores.name = "dude... you must name it!"
    if(form.image === "") errores.image = "how does it look like?"
    if(Number(form.life) === 0) errores.life = "is it alive?!"
    if(Number(form.attack) === 0) errores.attack = "that ain't tough enough"
    if(Number(form.defense) === 0) errores.defense = "you need to protect it!"

    return errores;
};

const Form = ()=>{

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types)

    const [form,setForm] = useState({
        name:"",
        image:"",
        life:"",
        attack:"",
        defense:"",
        types: []
    })
    
    const [errors, setErrors] = useState({})
    
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setErrors(validate({...form, [property]: value}))
        setForm({...form, [property]: value})
    }
    
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(postPokemons(form))
        
        // alert('new Pokemon was born!!')
        setForm({
            name:"",
            image:"",
            life:"",
            attack:"",
            defense:"",
            types: []
        })
    }

    const typesHandler = (event) => {
        setForm({
            ...form,
            types: [...form.types, event.target.value]
        })
    }

    console.log(form);
    
    return(
        <>
            <h1>A new pokemon will be born!!</h1>
            <form onSubmit={submitHandler}>
            <div>
                <label>Name: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image: </label>
                <input type="text" 
                value={form.image} 
                onChange={changeHandler} 
                name="image" />
                {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label>Life: </label>
                <input type="number" value={form.life} onChange={changeHandler} name="life" />
                {errors.life && <span>{errors.life}</span>}
            </div>
            <div>
                <label>Attack: </label>
                <input type="number" value={form.attack} onChange={changeHandler} name="attack" />
                {errors.attack && <span>{errors.attack}</span>}
            </div>
            <div>
                <label>Defense: </label>
                <input type="number" value={form.defense} onChange={changeHandler} name="defense" />
                {errors.defense && <span>{errors.defense}</span>}
            </div>
            <div>
                <label>Types</label>
                <select 
                // multiple
                name="types" 
                value={form.types}
                onChange={typesHandler}
                multiple
                >
                    {types.map((tipo) => (
                        <option value={tipo} key={tipo}>{tipo}</option>
                    ))}
                    
                </select>
                <ul><li>{form.types.map(type => type + " ,")}</li></ul>
            </div>

            <button type="submit">SUBMIT</button>
        </form> 
        </>
    )
}

export default Form;

