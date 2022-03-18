const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const {
	getAllPoke,
	getPokeDetails,
	postPokemon,
} = require('../Controllers/PokemonControlller');


router.get('/', async (req, res) => {
	try {
		const { name } = req.query;
		const poke = await getAllPoke(name);
		poke
			? res.status(200).send(poke)
			: res.status(404).send('No pokemon with that name');
	} catch (error) {
		console.log(error)
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	let poke = await getPokeDetails(id);
	poke
		? res.status(200).send(poke)
		: res.status(404).send('No pokemon with that id');
});

router.post('/', postPokemon);

module.exports = router;