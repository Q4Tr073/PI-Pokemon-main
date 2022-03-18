import React from "react";
import {Link} from 'react-router-dom';
import Style from './PokeCarr.module.css';


export default function PokeCard({id, name,types ,createdInDB, img }){
    console.log(types.map(e=>e.name))

    return(
        <div className={Style.card}>
            <div>
                <p>{id}</p>
                <h2>{name}</h2>
                <p>{createdInDB ? types.map(e=> e.name) : types}</p>            
                <img className={Style.img} src={img} alt=""/>
            </div>
            
            <Link to={`/pokemons/${id}`}>
                <button className={Style.button}>Pokedex</button>
            </Link>                      
        </div>
    )
}