const { Router } = require('express');
const router = Router();
const {Pokemon,Type}  = require('../db.js');
const { getTypes } = require('../controllers/controllers.js');

router.get('/', async(req,res)=>{
    try {
        let pokemonType = await getTypes();
        res.json(pokemonType);
    } catch (error) {
        res.status(404).send(error);
    }
    
});

module.exports = router;