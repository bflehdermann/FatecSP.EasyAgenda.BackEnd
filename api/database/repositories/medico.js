const db = require('../connector')

exports.findMedicoByEmail = (async(payload) =>{
    const {email} = payload
    const text = 'SELECT * FROM medico WHERE email LIKE $1'
    const values = [email]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        return err.stack
    }finally{
        client.release()
    }
})

exports.createMedico = (async(payload) =>{
    const{nome,crm,endereco,cep,cidade,estado,email,senha} = payload
    const text = 'INSERT INTO medico (nome,crm,endereco,cep,cidade,estado,email,senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
    const values = [nome,crm,endereco,cep,cidade,estado,email,senha]
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

exports.findAndUpdateMedico = (async( id, payload )=>{
    const{nome,crm,endereco,cep,cidade,estado,email,senha} = payload

    const textSemSenha = `UPDATE medico SET (nome,crm,endereco,cep,cidade,estado,email) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = ${id} RETURNING *`
    const valuesSemSenha = [nome,crm,endereco,cep,cidade,estado,email]

    const text = `UPDATE medico SET (nome,crm,endereco,cep,cidade,estado,email,senha) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id = ${id} RETURNING *`
    const values = [nome,crm,endereco,cep,cidade,estado,email,senha]
    
    const client = await db.connect()
    try{
        if(!senha){
            const res = await client.query(textSemSenha,valuesSemSenha)
            return res.rows[0]
            }
            else {const res = await client.query(text,values)
            return res.rows[0]
            }
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

exports.findAndDeleteMedico = (async(id)=>{
    const textHorario = 'DELETE FROM horario WHERE id_medico = $1'
    const textEspecialidade = 'DELETE FROM medico_especialidade WHERE id_medico = $1'
    const textMedico = 'DELETE FROM medico WHERE id = $1 RETURNING *'
    const values = [id]
    const client = await db.connect()
    try{
        await client.query(textHorario,values)
        await client.query(textEspecialidade,values)
        const res = await client.query(textMedico,values)
 
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

exports.findMedicoById = (async(payload) =>{
    const {id_medico:id} = payload
    const text = 'SELECT * FROM medico WHERE id = $1'
    const values = [id]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        return err.stack
    }finally{
        client.release()
    }
})