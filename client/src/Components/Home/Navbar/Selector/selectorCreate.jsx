import React, { useState } from "react";
import {filterCreated} from '../../../../Reducer/Action/actions';
import {useDispatch} from 'react-redux';
import Style from './Selector.module.css';


export default function SelectorCreated({setOrder}){

    const dispatch = useDispatch();
    

    function handleFilterCreated(e) {        
        dispatch(filterCreated(e.target.value))
        setOrder(`Ordered ${e.target.value}`)
      }

    

    return(
        <div>
            <select onChange={e =>handleFilterCreated(e)} className={Style.select}>
                    <option>Create Or No</option>
                    <option value='All'>All Pokemons</option>
                    <option value='created'>Created</option>                    
            </select>
        </div>
    )
}