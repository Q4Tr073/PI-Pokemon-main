import {React, useState} from "react";
import {useDispatch} from 'react-redux';
import { filterBySearch, getAllPokemons } from "../../../../Reducer/Action/actions";
import Style from './SearchBar.module.css';


export default function SearchBar(){
    const dispatch= useDispatch();
    const [name, setName]= useState('');

    

    function handleInputChange(e){
        e.preventDefault();        
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name.length > 0){
            dispatch(filterBySearch(name))
        }else {
            alert('Do not leave the field empty')
            dispatch(getAllPokemons())
        }                
    }

    return(
        <div className={Style.searchbar}>
            <input type='text' placeholder="Choose your pokemon..." value={name} onChange={(e)=> handleInputChange(e)}/>
            <button className={Style.buttonSearch} type="submit" onClick={(e)=> handleSubmit(e) }>Catch it!!</button>
        </div>
    )
}