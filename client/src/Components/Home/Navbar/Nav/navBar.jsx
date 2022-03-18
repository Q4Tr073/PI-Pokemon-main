import React from "react";
import { Link } from 'react-router-dom';
import SelectorTypes from '../Selector/selectorTypes';
import SelectorAlpha from '../Selector/selectorAlpha';
import SelectorForze from '../Selector/selectorForze';
import SelectorCreate from "../Selector/selectorCreate";
import Style from './Nav.module.css';



export default function NavBar({setOrder}){    


    return(
        <div className={Style.navBar}>
            <div className={Style.contenedor}>
                <Link to='/'>
                    <a href="#" className={Style.logo}>Poke App</a>
                </Link>                            
            </div>
            <SelectorTypes setOrder = {setOrder}/>
            <SelectorCreate setOrder = {setOrder}/>
            <SelectorAlpha setOrder = {setOrder}/>
            <SelectorForze setOrder = {setOrder}/> 
            <div className={Style.buttonDiv}>
                <Link to='/create'>
                    <button className={Style.button}>Create</button>
                </Link>
            </div>           
        </div>
    )
}