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
    const {idMedico:id_medico, dia:data} = payload
    const text = 'SELECT * FROM horario WHERE id_medico=($1) AND data = ($2)'
    const values = [id_medico, data]
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

exports.createHorario=(async(payload)=>{
    
    const { id_medico,hora_inicio,hora_fim, id_cliente, data } = payload
    const text = 'INSERT INTO horario (id_medico,hora_inicio,hora_fim, id_cliente,data) VALUES ($1,$2,$3,$4,$5) RETURNING *'
    const values = [id_medico,hora_inicio,hora_fim, id_cliente,data]
    const client = await db.connect()
    try{
        const res = await client.query(text,values) 
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

//findAndDeleteHorario(25)