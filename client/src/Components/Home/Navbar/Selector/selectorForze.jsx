import React from "react";
import { useDispatch } from "react-redux";
import { filterForza } from '../../../../Reducer/Action/actions'
import Style from './Selector.module.css'

export default function SelectorForze({setOrder}){
    const dispatch = useDispatch();
    function handleOrder(e){
        e.preventDefault();
        dispatch(filterForza(e.target.value))
        setOrder(`orderer ${e.target.value}`)
    }

    return(
        <div>
            <select onChange={(e)=> handleOrder(e)} className={Style.select}>
                <option>Strength</option>
                <option value='max'>max</option>         
                <option value='min'>min</option>
            </select>
        </div>
    )
}