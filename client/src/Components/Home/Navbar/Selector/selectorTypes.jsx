import { React, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getByTypes, filterTypes } from "../../../../Reducer/Action/actions";
import Style from './Selector.module.css'

export default function SelectorTypes(){
    
    const allTypes = useSelector((state)=> state.types);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getByTypes())
    },[])
    
    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterTypes(e.target.value))
    }   

    
    return(
        <div>
            <select onChange={(e)=> handleFilterType(e)} className={Style.select}>
                <option value= 'All'>Types</option>
                {
                    allTypes.types?.map((el)=>{
                        return (                            
                            <option value={el.name}>{el.name}</option>                            
                        )
                    })
                }
            </select>
        </div>
    )
}