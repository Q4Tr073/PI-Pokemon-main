const axios = require('axios');
const { Pokemon, Types} = require('../db');

let getPokeApi = async () => {
    try {
        let info = [];
        for (let i = 1; i <= 40; i++) {
            info.push(await axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
            console.log(info[i-1].data.id)
        }
        return await Promise.all(info).then((response) => {
            const pokemones = response.map((info) => {
                return (poke = {
                    name: info.data.name,
                    id: info.data.id,
                    img: info.data.sprites.other.dream_world.front_default,
                    types: info.data.types.map((e) => e.type.name),
                    attack: info.data.stats[1].base_stat,
                });
            });            
            return pokemones;
        });
    } catch (error) {
        console.log (error)
    }
};

let getPokeDB = async () => {
    try {
        let poke = await Pokemon.findAll({
            include: {
                model: Types, through: {
                    attributes: [],
                }
            },
        })
        return poke;
    } catch (error) {
        console.log(error)
    }
};

let pokeFilterByName = async (allPoke, name) => {
    try {
        let poke = allPoke.filter((poke) => {
            return poke.name.toLowerCase() === name.toLowerCase();
        });

        if (!poke.length) {
            let info = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);
            info = info.data;
            return (poke = [
                {
                    name: info.name,
                    id: info.id,
                    img: info.sprites.other.dream_world.front_default,
                    hp: info.stats[0].base_stat,
                    attack: info.stats[1].base_stat,
                    defense: info.stats[2].base_stat,
                    speed: info.stats[3].base_stat,
                    types: info.types.map((t) => t.type.name),
                    weight: info.weight,
                    height: info.height,
                },
            ]);
        }
        return poke;
    } catch (error) {
        console.log(error)
    }
};

let getPokeDbByID = async (id) => {
    let info = await Pokemon.findAll({
        attributes: [
            'name',
            'id',
            'img',
            'hp',
            'attack',
            'defense',
            'speed',
            'weight',
            'height',
        ],
        include: {
            model: Types,
        },
    });
    info = info.find((poke) => poke.id === id);
    try {
        return (poke = {
            name: info.name,
            id: info.id,
            img: info.img,
            hp: info.hp,
            attack: info.attack,
            defense: info.defense,
            speed: info.speed,
            types: info.types.map((t) => t.name),
            weight: info.weight,
            height: info.height,
        });
    } catch {
        return null;
    }
};

let getPokeApiByID = async (id) => {
    try {
        let info = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
        info = info.data;
        return (poke = {
            name: info.name,
            id: info.id,
            img: info.sprites.other.dream_world.front_default,
            hp: info.stats[0].base_stat,
            attack: info.stats[1].base_stat,
            defense: info.stats[2].base_stat,
            speed: info.stats[3].base_stat,
            types: info.types.map((t) => t.type.name),
            weight: info.weight,
            height: info.height,
        });
    } catch(error) {
        console.log(error);
    }
};

const dbReload = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type")
    await data.results.map((e) => Types.findOrCreate({
        where: { name: e.name }
    })
    )
}

module.exports = {
    getPokeApi,
    getPokeDB,
    pokeFilterByName,
    getPokeApiByID,
    getPokeDbByID,
    dbReload,
};