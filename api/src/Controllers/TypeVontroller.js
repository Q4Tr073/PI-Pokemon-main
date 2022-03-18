let { Types } = require('../db');

let getTypesDB = async () => {
	const allTypes = await Types.findAll()
	return allTypes;
};
module.exports = { getTypesDB };