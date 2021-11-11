const db = require('../connector')


exports.createMedicoEspecialidade = (async(id, payload) =>{

    const{especialidades} = payload

    const text = 'INSERT INTO medico_especialidade (id_medico,id_especialidade) VALUES ($1,$2) RETURNING *'
    const client = await db.connect()
    return await Promise.all(
        especialidades.map(async(id_especialidade) =>{

            const values = [id, id_especialidade]
            try{
                const res = await client.query(text,values)
                
                return res.rows[0].id_especialidade
    
            }catch (err){
                console.log(err.stack)
                return err.stack
            }
        })
    )

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
    return await this.createMedicoEspecialidade(id,payload)
})
