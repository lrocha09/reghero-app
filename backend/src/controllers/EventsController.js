const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('events')
            .count();
        
        //console.log(count);
        
        const events = await connection('events')
            .join('contractor', 'contractor.id', '=', 'events.events_id' )
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'events.*', 
                'contractor.name', 
                'contractor.email', 
                'contractor.whatsapp', 
                'contractor.city', 
                'contractor.name', 
                'contractor.uf'
            ]);

        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(events);
    },

    async create(request, response){
        const { title, date, description, local, value } = request.body;
        const events_id = request.headers.authorization;

        

        const [id] = await connection('events').insert({
            title, 
            date, 
            description, 
            local, 
            value,
            events_id,
        });

        return response.json({ id });
    },  

    async delete(request, response){
        const { id } = request.params;
        const events_id = request.headers.authorization;

        const events = await connection('events')
        .where('id', id)
        .select('events_id')
        .first();

        if (events.events_id != events_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
           
        await connection('events').where('id', id).delete();

        return response.status(204).send();
    }
};
