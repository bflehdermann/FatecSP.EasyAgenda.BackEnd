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
    const text = `SELECT h.id, id_cliente, hora_inicio, data, nome AS nome_paciente
                  FROM horario AS h
                  INNER JOIN paciente AS p ON p.id = h.id_cliente 
                  WHERE id_medico=($1) AND data = ($2)
                  ORDER BY data, hora_inicio ASC`
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

exports.FindHorarioPorIdPaciente=(async(payload)=>{
    const {idPaciente:id_paciente} = payload
    const text = `SELECT 
                  h.id, id_medico, hora_inicio, data, nome AS nome_medico, email, crm,endereco,cep, cidade, estado
                  FROM horario AS h
                  INNER JOIN medico AS m ON m.id = h.id_medico
                  WHERE id_cliente = ($1) ORDER BY data, hora_inicio ASC`
    const values =[id_paciente]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows
    }catch(err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})
