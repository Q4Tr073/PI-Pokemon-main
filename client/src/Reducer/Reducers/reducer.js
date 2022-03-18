import {GET_POKE, 
    FILTER_TYPES,
    GET_BY_TYPES,
    GET_BY_NAME,
    FILTER_BY_ALPHA,
    GET_POKE_BY_ID,
    FILTER_BY_FORZA,
    FILTER_BY_SEARCH,
    FILTER_CREATED    
} from '../../Components/Constants/constants'

const initialState={
    pokemon:[],
    allPoke:[],    
    types: [],
    detail: [],    
}


const reducer= (state=initialState, action)=>{
    switch(action.type){
        case GET_POKE:
            return{
                ...state,
                pokemon: action.payload,
                allPoke: action.payload
            }
            
        case GET_POKE_BY_ID:
            console.log(action.payload)
            if(action.payload === 'vacio'){
                return {
                    ...state,
                detail: []
                }
            }
            return {
                ...state,
                detail: action.payload
            }
            
        case GET_BY_NAME: 
            return {
                ...state,
                allPoke: action.payload
        }
        case GET_BY_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPES:            
            return {
                ...state,
                pokemon:action.payload === 'All'? state.allPoke: 
                state.allPoke.filter(el=> el.types?.includes(action.payload))                
            }

        case FILTER_BY_ALPHA:
            
            const sortAlph =
            action.payload === "A-Z"
            ? state.allPoke.sort((a, b) => a.name.localeCompare(b.name))
            : state.allPoke.sort((a, b) => b.name.localeCompare(a.name));
                return{
                    ...state,
                    pokemon: sortAlph 
                }
        
        case FILTER_BY_FORZA:
            let sortPop= action.payload === 'min' ? state.allPoke.sort(function(a,b){
                if(a.attack > b.attack){
                    return 1;
                }
                else if(b.attack  > a.attack){
                    return -1;
                }else{
                return 0;
            }
            }): 
                state.allPoke.sort(function(a,b){
                    if(a.attack > b.attack){
                        return -1;
                    }
                    else if(b.attack  > a.attack ){
                        return 1;
                    }else{
                    return 0;
                    }
                })
                return{
                    ...state,
                    pokemon: sortPop 
                }
            case FILTER_BY_SEARCH:
                return{
                    ...state,
                    pokemon: action.payload
                }
            case FILTER_CREATED:
                
                const createdFilter = state.allPoke.filter(el => el.createdInDB);
                const all = state.allPoke.filter(el=> !el.createdInDB)
                return {
                    ...state,
                    pokemon: action.payload === 'created' ? createdFilter : all
                }         
                
        

        default:
            return{
                ...state
                }
        
    }        
}

export default reducer;