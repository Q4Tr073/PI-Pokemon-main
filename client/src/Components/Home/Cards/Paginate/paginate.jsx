import React from "react";
import Style from './Pag.module.css'


export default function Paginate({pokePerPage, allPokemon,pag}){
    const pageNumbers=[];

    for(let i=1; i<Math.ceil(allPokemon/pokePerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div className={Style.paginate}>
            <nav>
                <ul>
                    {pageNumbers && pageNumbers.map(number=>
                    <button className={Style.button} onClick={()=>pag(number)}>{number}</button>)}
                </ul>
            </nav>
        </div>
        
    )
}