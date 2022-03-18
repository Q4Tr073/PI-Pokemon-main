import axios from 'axios';
import {POKE_URL,
        GET_POKE,
        GET_BY_NAME,
        POKE_URL_TYPES,
        GET_BY_TYPES,
        GET_POKE_BY_ID,
        POKE_URL_ID,
        FILTER_TYPES,
        FILTER_BY_ALPHA,
        FILTER_BY_FORZA,
        FILTER_BY_SEARCH,
        POKE_NAME,
        FILTER_CREATED
    } from '../../Components/Constants/constants'

export function getAllPokemons(){
    return function(dispatch){
        return fetch(POKE_URL)
        .then(response=> response.json())
        .then(res=> {
            dispatch({
                type: GET_POKE,
                payload: res
            })
        })
    }
}

export function getByName(name){

    return function(dispatch){  
        try{
            return fetch(POKE_URL + name)
            .then(response=> response.json())
            .then(res=> {
                dispatch({
                    type: GET_BY_NAME,
                    payload: res
            })
        })
        }catch(error){
            console.log(error)
        }       
    }
}

export function getByTypes() {
    return function(dispatch){
        return fetch(POKE_URL_TYPES)
        .then(respose => respose.json())
        .then(res => {
            dispatch({
                type: GET_BY_TYPES,
                payload: res
            })
        })
    }
}

export function getPokeId(id){
    if(id === 'vacio'){
        return {
            type: GET_POKE_BY_ID,
            payload: id
        }
    }
    return function(dispatch){        
        return fetch(POKE_URL_ID + id)
        .then(response => response.json())
        .then(res=>{
            dispatch({
                type: GET_POKE_BY_ID,
                payload: res
            })
        })
    }
}

export function filterTypes(payload){    
    return {
        type:FILTER_TYPES,
        payload
    }        
}


export function filterAlpha(payload){
    return {
        type:FILTER_BY_ALPHA,
        payload
    }
}

export function filterForza(payload){
    return {
        type: FILTER_BY_FORZA,
        payload
    }
}

export function filterBySearch(name){
    return function(dispatch){
        try{
            return fetch(POKE_NAME + name)
            .then(response=> response.json())
            .then( res=>{
                dispatch({
                    type: FILTER_BY_SEARCH,
                    payload: res
                })
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postPokemon(payload){
    console.log(payload)
    try{
      return async function (){
        await axios.post(POKE_URL, payload)
      }
    }catch(error){
      console.log(error)
    }
  }

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}