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
    const text = `SELECT h.id, id_cliente, hora_inicio, data, nome AS nome_paciente, relatorio_medico
                  FROM horario AS h
                  LEFT JOIN paciente AS p ON p.id = h.id_cliente 
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
                  h.id, m.id AS id_medico, hora_inicio, hora_fim, data, m.nome AS nome_medico, email, crm,endereco,cep, cidade, estado, relatorio_medico, s.nome AS especialidade
                  FROM horario AS h
                  INNER JOIN medico AS m ON m.id = h.id_medico
                  INNER JOIN medico_especialidade AS ms ON ms.id_medico = m.id
                  INNER JOIN especialidade AS s ON s.id = ms.id_especialidade
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

exports.indisponibilidadeHorarioMedico=(async(payload)=>{
    
  const { id_medico,hora_inicio,hora_fim, data } = payload
  const text = 'INSERT INTO horario (id_medico,hora_inicio,hora_fim,data) VALUES ($1,$2,$3,$4) RETURNING *'
  const values = [id_medico,hora_inicio,hora_fim,data]
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



exports.setRelatorioByid=(async(payload)=>{
  const {id, relatorio_medico} = payload
  const text = `UPDATE horario SET relatorio_medico = $1 WHERE id = ${id} RETURNING *`
  const values=[relatorio_medico]
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

