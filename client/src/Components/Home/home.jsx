import {React, useEffect, useState}  from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllPokemons, getPokeId } from '../../Reducer/Action/actions';
import PokeCard from './Cards/Card/pokeCard';
import NavBar from './Navbar/Nav/navBar';
import Paginate from './Cards/Paginate/paginate';
import SearchBar from './Navbar/SearchBar/searchbar';
import Style from './Home.module.css';
import ImagePoke from '../Imagenes/home.jpg';
import ImageLoading from '../Imagenes/loading.gif';
import Loading from '../Loading/Loading';


export default function Home(){

    const allPokemon= useSelector((state)=> state.pokemon);
    const[currentPage,setCurrentPage]= useState(1);
    const[pokePerPage]= useState(12);
    const types = useSelector((state) => state.types)
    const indexOfLastPoke= currentPage * pokePerPage;
    const indexOfFristPoke= indexOfLastPoke- pokePerPage;
    const currentPoke= allPokemon.slice(indexOfFristPoke, indexOfLastPoke)
    const[order,setOrder]= useState('');
    const [loading, setLoading] = useState(true);

    const pag=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }


    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getPokeId('vacio'));
        dispatch(getAllPokemons());
    },[])

    return(
        <>
        <div className={Style.background}> 
             <img src={ImagePoke} className={Style.stretch} alt="" />
        </div>
        {
            loading === true? <Loading setLoading={setLoading}/>:
        
        <div className={Style.home}>
            <NavBar
                types={types}
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
            />
            <SearchBar/>
            <Paginate
                pokePerPage={pokePerPage}
                allPokemon={allPokemon.length}
                pag={pag}
            />
            <div>
                <spam className={Style.cards}>
                    {
                        allPokemon.length > 0 ?
                        currentPoke?.map((poke)=>{
                            return(
                                    <div>
                                        <PokeCard
                                            key={poke.id}
                                            id={poke.id}
                                            name={poke.name}
                                            types={poke.types}
                                            img={poke.img}
                                            attack={poke.attack}
                                            createdInDB={poke.createdInDB}
                                        />
                                    </div>                     
                                )
                            }) :
                            
                             <div className={Style.loadingDiv}>
                                 <p className={Style.loading}>No Pokemon</p>
                                 <div>
                                     <img src={ImageLoading} className={Style.imgLoad} alt=''/>
                                 </div>                
                             </div>
                             
                }
                </spam>
            </div>
            <Paginate
                pokePerPage={pokePerPage}
                allPokemon={allPokemon.length}
                pag={pag}
                />              
             
        </div>
        }
        </>
    )    
}