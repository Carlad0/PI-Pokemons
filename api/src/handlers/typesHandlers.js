const { getApiTypes } = require('../controllers/typesControllers');
const { Type } = require('../db.js');


const getTypesHandler = async (req, res) => {
    try {
        
        const typesSearch = await getApiTypes();
        if(typesSearch.error) throw new Error(typesSearch.error)
        return res.status(200).json(typesSearch);

    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = { getTypesHandler };
