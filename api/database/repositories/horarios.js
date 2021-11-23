const db = require('../connector')

exports.findAndDeleteHorario = (async(payload)=>{
    const {id} = payload
    const textHorario = 'DELETE FROM horario WHERE id = $1 RETURNING *'
    const values = [id]
    const client = await db.connect()
    try{
        const res = await client.query(textHorario,values) 
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

exports.findHorarioMedicoPorDia = (async(payload)=>{
    const {idMedico:id_medico, dia:data_hora_inicio} = payload
    const text = 'SELECT * FROM horario WHERE id_medico=($1) AND data_hora_inicio = ($2)'
    const values = [id_medico, data_hora_inicio]
    const client = await db.connect()
    try{
        const res = await client.query(text,values) 
        return res.rows
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

//findAndDeleteHorario(25)