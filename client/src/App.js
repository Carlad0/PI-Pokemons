import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './Components/NavBar/NavBar';
import styles from './App.module.css';
// import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const location = useLocation().pathname;

  // const {loginWithRedirect, loginWithPopup, logout, user, isAuthenticated} = useAuth0();
  
  return (
    <div className={styles.App}>
      {/* <h2>Auth0 Authentication</h2>
            
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
            {isAuthenticated && (
                <pre style={{textAlign:'start' }}>
                {JSON.stringify(user, null, 2)}
                </pre>
            )} */}



      {location !== "/" && <NavBar />}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:idPokemon' element={<Detail />} />
        <Route exact path='/create' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
