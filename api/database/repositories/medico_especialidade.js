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

exports.findMedicoEspecialidadesById = (async(id) =>{
    const text = 'SELECT id_especialidade AS id FROM medico_especialidade WHERE id_medico = $1'
    const values = [id]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        let response = []
        res.rows.map(async(r)=>{
            response.push(r.id)
        })
        return response
        
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})

exports.updateMedicoEspecialidade = (async(id, payload)=>{
    let text = 'DELETE FROM medico_especialidade WHERE id_medico = $1'
    let values = [id]
    const client = await db.connect()
    try{
        await client.query(text,values)
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
    await this.createMedicoEspecialidade(id,payload)
})
