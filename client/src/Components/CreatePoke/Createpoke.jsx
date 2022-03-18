import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getByTypes, postPokemon } from "../../Reducer/Action/actions";
import { useDispatch, useSelector } from "react-redux";
import Style from './CreatePoke.module.css';
import ImageCreate from '../Imagenes/create.jpg';



export default function CreatePoke() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types)
   
  
  const [err, setErr] = useState({});

  function validate(input) {
    let err = {};
    if (!input.name) {
      err.name = "*Need a name";
    }
    if (!input.img.includes("https://" || "http://") &&
            !input.img.includes(".jpg" || ".jpeg" || ".png")
          ) {
            err.img = "Enter a valid URL (.jpg, .jpeg, .png)";
          }
    if (!input.hp) {
      err.hp = "*Need a number greater than one";
    }
    if (!input.attack) {
      err.attack = "*Need a number greater than one";
    }
    if (!input.defense) {
      err.defense = "*Need a number greater than one";
    }
    if (!input.speed) {
      err.speed = "*Need a number greater than one";
    }
    if (!input.height) {
        err.height = "*Need a number greater than one";
    }
    if (!input.weight) {
      err.weight = "*Need a number greater than one";
  }
    
    return err;
  }
  
  
  const [input, setInput] = useState({
    id: uuidv4(),
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: ''
  });
  console.log(input)

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErr(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErr(validate(input));
    const errorSave = validate(input);
    if(Object.values(errorSave).length !== 0){
      alert('The pokemon is not created, fill in the required fields!')
    }else{
      dispatch(postPokemon(input));
    navigate('/pokemons')
    alert("Pokemon successfully created");
    setInput({             
        name: '',
        img: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: ''
    });
    }   
  }
  

  function handleSelectChange(e) {
    e.preventDefault()
    var tipo = allTypes.types?.find((elemento) => elemento.name === e.target.value)
        setInput({
            ...input,
            types: tipo.id
        })
}

  useEffect(() => {
    dispatch(getByTypes());
  }, [dispatch]);

  return ( 
    <>
      <div className={Style.background}> 
        <img src={ImageCreate} className={Style.stretch} alt="" />
      </div>
    
        <div className ={Style.general}> 
        <h1 className={Style.title1}>Create your Pokemon!!</h1>  
          <div className ={Style.form}>
            
            <form onSubmit={(e) => handleSubmit(e)}>
              
              <div>

                <div>
                  <label className={Style.title2}>Name </label>
                  <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.name && <p>{err.name}</p>}</div>
                </div>

                <div>
                  <label className={Style.title2}>Image </label>
                  <input type="text" value={input.img} name="img" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.img && <p>{err.img}</p>}</div>
                </div>

                <div>
                  <label className={Style.title2}>Health power </label>
                  <input type="number" min='0' value={input.hp} name="hp" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.hp && <p>{err.hp}</p>}</div>                  
                </div>

                <div>
                  <label className={Style.title2}>Attack </label>
                  <input type="number" min='0' value={input.attack} name="attack" onChange={(e) => handleChange(e)}/>
                </div>
                <div className={Style.errLabel}>{err.attack && <p>{err.attack}</p>}</div>

                <div>
                  <label className={Style.title2}>Defense </label>
                  <input type="number" min='0' value={input.defense} name="defense" onChange={(e) => handleChange(e)}/>
                </div>
                <div className={Style.errLabel}>{err.defense && <p>{err.defense}</p>}</div>

                <div>
                  <label className={Style.title2}>Speed </label>
                  <input type="number" min='0' value={input.speed} name="speed" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.speed && <p>{err.speed}</p>}</div>
                </div>

                <div>
                  <label className={Style.title2}>Height </label>
                  <input type="number" min='0' value={input.height} name="height" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.height && <p>{err.height}</p>}</div>
                </div>

                <div>
                  <label className={Style.title2}>Weight </label>
                  <input type="number" min='0' value={input.weight} name="weight" onChange={(e) => handleChange(e)}/>
                  <div className={Style.errLabel}>{err.weight && <p>{err.weight}</p>}</div>
                </div>
                
                
              </div>

              <label className={Style.title2}>Types</label>
                <select name="types" onChange={(e) => handleSelectChange(e)} className={Style.select}>
                    <option value='all'>Choose type </option>
                    {allTypes.types?.map((allTypes) => {
                        return (
                            <option
                                key={allTypes.id}
                                value={allTypes.name}>
                                {allTypes.name}
                            </option>
                        );
                    })}
                </select>
                <button className={Style.button} type="submit">Create!</button>
            </form>
          </div>
          <div>
              <NavLink to="/pokemons">
                <button className={Style.button}>Return</button>
              </NavLink>
          </div> 
        </div> 
        </>    
  );
}