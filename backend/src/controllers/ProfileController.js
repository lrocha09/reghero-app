const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const contractor_id = request.headers.authorization;

        const events = await connection('events')
            .where('events_id', contractor_id)
            .select('*');
        
        return response.json(events);

    }
}