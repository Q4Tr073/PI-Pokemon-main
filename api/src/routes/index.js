const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokeRoute = require('./pokeRoutes');
const typeRoute = require('./typeRoutes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokeRoute);
router.use('/types', typeRoute);


module.exports = router;
