const db = require('../connector')

exports.createMedicoEspecialidade = (async(id, payload) =>{

    const{especialidades} = payload

    const client = await db.connect()

    especialidades.map(async(id_especialidade) =>{
        let text = 'INSERT INTO medico_especialidade (id_medico,id_especialidade) VALUES ($1,$2)'
        let values = [id, id_especialidade]
        try{
            await client.query(text,values)
        }catch (err){
            console.log(err.stack)
            return err.stack
        }
    }) 

})