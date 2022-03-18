import React from "react";
import { useDispatch } from "react-redux";
import { filterAlpha } from "../../../../Reducer/Action/actions";
import Style from './Selector.module.css'

export default function SelectorAlpha({setOrder}){

    const dispatch = useDispatch();
    
    
    function handleSelectAlpha(e){
        e.preventDefault();
        dispatch(filterAlpha(e.target.value));
        setOrder(`Ordered ${e.target.value}`);
    }

    return(
        <div>            
            <select onClick={e => handleSelectAlpha(e)} defaultValue = 'default' className={Style.select}>
                        <option value="default" disabled>Select order</option>
                        <option value="A-Z">Ascenant</option>
                        <option value="Z-A">Descendant</option>                        
            </select>            
        </div>
    )
}