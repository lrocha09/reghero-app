const connection = require('../database/connection');

module.exports = {
    async create (request, response){
        const { id } = request.body;

        const contractor = await connection('contractor')
            .where('id', id)
            .select('name')
            .first();

        if(!contractor){
            return response.status(400).json({ error: 'No CONTRACTOR found with this ID' });
        }
        
        return response.json(contractor);
    }
}