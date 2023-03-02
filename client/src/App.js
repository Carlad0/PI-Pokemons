import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './Components/NavBar/NavBar';


function App() {
  const location = useLocation().pathname;

  return (
    <div className="App">
      {/* <h1>Henry Pokemon</h1> */}
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
