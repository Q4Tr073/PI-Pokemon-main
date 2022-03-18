import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getPokeId} from '../../../../Reducer/Action/actions';
import ImageDex from '../../../Imagenes/pokeDex.jpg'
import Style from './PokeDex.module.css';


export default function PokeDex(props){
    const {id} = useParams();
    const dispatch = useDispatch();

    const ditail = useSelector((state)=> state.detail);
    console.log(ditail)

    useEffect(()=>{
        dispatch(getPokeId(id))
    },[])

    return (
        <>
        <div className={Style.background}> 
             <img src={ImageDex} className={Style.stretch} alt="" />
        </div>
        <h1 className={Style.title}>POKE DEX !!</h1> 

        {
            ditail.length < 0 ?
            <div>
                <p className={Style.loading}>Loading...</p>
            </div>:

            <div className={Style.pokeDex}>
            <div className={Style.imgCont}>
                <img className={Style.img} src={ditail.img} alt=''/>
            </div>

            <div className={Style.pokeDetail}>
                <h2>name:{ditail.name }</h2>
                <p>hp:{ditail.hp}</p>
                <p>Attack:{ditail.attack}</p>
                <p>Defense:{ditail.defense}</p>
                <p>Speed:{ditail.speed}</p>
                <p>Heigth:{ditail.height}</p>
                <p>Weight:{ditail.weight}</p>            
                </div>
            </div>            
        }        
        <div className={Style.pokeDex}>
            <Link to='/pokemons'>
                <button className={Style.button}>Back</button>
            </Link>
        </div>
        </>
    )
}