const {
	getPokeApi,
	getPokeDB,
	pokeFilterByName,
	getPokeApiByID,
	getPokeDbByID,
} = require('./Controller');

const { Pokemon } = require('../db');

const getAllPoke = async (name) => {
	try {
		const [api, db] = await Promise.all([getPokeApi(), getPokeDB()]);
		const allPoke = [...db,...api];
		if (name) {
			let prueba = await pokeFilterByName(allPoke, name);
			return prueba;
		}
		return allPoke;
	} catch (error) {
		console.log(error)
	}
};

const getPokeDetails = async (id) => {
	let poke = null;
	if (id.length < 10) {
		poke = await getPokeApiByID(id);
	} else {
		poke = await getPokeDbByID(id);
	}
	return poke;
};


const postPokemon = async (req, res) => {
	const { name, id, img, hp, attack, defense, speed, height, weight, types, createdInDB } = req.body;
	try {
		const pokemonCreated = await Pokemon.create({ name, id, img, hp, attack, defense, speed, height, weight, createdInDB	})
		await pokemonCreated.addTypes(types)
		res.send("pokemon created")
	} catch (error) {
		console.log(error)
	}
}



module.exports = {
	getAllPoke,
	getPokeDetails,
	postPokemon,
};