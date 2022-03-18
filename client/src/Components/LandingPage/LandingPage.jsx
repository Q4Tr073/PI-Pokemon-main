import React from "react";
import { Link } from "react-router-dom";
import Style from './Landing.module.css';


export default function LandingPage(){
    return (
        <div className={Style.landing}>
            <h1 className={Style.h1}>Be a Pokemon master!!</h1>
            <div className={Style.buttonDiv}>
                <Link to= '/pokemons'>
                    <button className={Style.button}>Catch it!!</button>
                </Link>
            </div>            
        </div>        
    )
}