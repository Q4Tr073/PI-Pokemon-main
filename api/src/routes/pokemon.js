const { Router } = require('express');
const {allPokemon,allPokemonId} = require('../controllers/controllers');
const {Pokemon,Type}  = require('../db.js');
const router = Router();

router.get('/', async(req,res,next)=>{
    const {name} = req.query;
    try {
        let infoPokemons = await allPokemon();
    if(name){
        let pokemonName = await infoPokemons.filter(e => e.name.toLowerCase() === name.toLowerCase());
        if(pokemonName.length === 0){
            res.status(404).send('No se encontro Pokemon');
        } 
        else{
            res.status(200).send(pokemonName);
        }
    }else{
        res.status(200).json(infoPokemons);
        
    }
    } catch (error) {
        next(error);
    }
    
    
});

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        let infoPokemon = await allPokemonId(id);
        res.status(200).json(infoPokemon);
    } catch (error) {
        res.status(404).send(error);
    }
    
});

router.post('/', async (req,res)=>{
    const { name, hp, attack, defense, speed, height, weight, types } = req.body;
    
    try {
        let pokemonExist = await Pokemon.findOne({
            where:{
                name : name.toLowerCase(),
            }
        });
        
        if(pokemonExist) return res.json({msg: 'Pokemon existente'});
    
        let newPokemon = await Pokemon.create({
            name : name.toLowerCase(),
            img : 'https://img.search.brave.com/DgXhYLiK-dmzv7iCMP20jz0Q5UFOhY5KVdM6_bT27f8/fit/256/228/ce/1/aHR0cHM6Ly82NC5t/ZWRpYS50dW1ibHIu/Y29tLzcwOGQ0NWYw/ZGZmOGM2MjhmOWI1/OWI3ZWYwYjU2Yjdm/L3R1bWJscl9pbmxp/bmVfb2l5YXR1dTZk/dzF1MGF4eDdfNTQw/LmdpZnY',
            hp : hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight
        });
    
        let pokemonType = await Type.findAll({
            where:{
                name : types
            }
        });
    
        await newPokemon.addType(pokemonType);
        res.status(200).json({msg: 'Pokemon creado'});
    } catch (error) {
        res.status(404).send(error);
    }

});

module.exports = router;