import style from './Landing.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Landing = () => {

    const {
        loginWithRedirect, 
        loginWithPopup, 
        logout, 
        user, 
        isAuthenticated,
        getAccessTokenSilently
    } = useAuth0();

    const callApi = async () => {
        axios
        .get("http://localhost:3001/pokemons/unprotected")
        .then(response => console.log(response.data))
        .catch(error => console.log(error.message));
    }

    const callProtectedApi = async () => {
        try {        
            const token = await getAccessTokenSilently();
            console.log(token)
            const response = await axios.get("http://localhost:3001/protected", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.email);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        
        <div className={style.container}>
            <h2>Auth0 Authentication</h2>
            
            <ul>
                <li>
                    <button onClick={loginWithPopup}>Login with Popup</button>
                </li>
                <li>
                    <button onClick={loginWithRedirect}>Login  with Redirect</button>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
            <h3>User is {isAuthenticated ? "Logged in" : "Not logged in"} </h3>
                <ul>
                    <li>
                        <button onClick={callApi}
                        >Call API</button>
                    </li>
                    <li>
                        <button onClick={callProtectedApi}
                        >Call Protected API Route</button>
                    </li>
                </ul>


            {isAuthenticated && (
                <pre style={{textAlign:'start' }}>
                {JSON.stringify(user, null, 2)}
                </pre>
            )}


            <h1 className={style.text}>Pokemon Landing Page</h1>
            <a href='/home' className={style.button}>
                <span>Home</span>
            </a>
        </div>
        
    )
}

export default Landing;