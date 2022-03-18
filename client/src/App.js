import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/Components/Home/home';
import LandingPage from '../src/Components/LandingPage/LandingPage';
import PokeDex from './Components/Home/Cards/CardDetail/pokeDex';
import CreatePoke from './Components/CreatePoke/Createpoke'



function App() {
  return (
    <div>
      <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/pokemons' element={<Home/>}/>
          <Route exact path='/pokemons/:id' element={<PokeDex/>}/>
          <Route exact path='/create' element={<CreatePoke/>}/>
      </Routes>   
    </div>    
  );
}

export default App;
