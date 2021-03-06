const db = require('../connector')

exports.findPacienteByEmail = (async(payload) =>{
    const {email} = payload
    const text = 'SELECT * FROM paciente WHERE email LIKE $1'
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

exports.createPaciente = (async(payload) =>{
    const{nome,email,cpf,convenio,senha} = payload
    const {
        carteirinhaConvenio:carteirinha_convenio,
        validadeConvenio: validade_convenio,
        planoConvenio: plano_convenio } = payload
    const text = 'INSERT INTO paciente (nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
    const values = [nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha]
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

exports.FindAndUpdatePaciente = (async(id,payload)=>{
    const{nome,email,cpf,convenio,senha} = payload
    const {
        carteirinhaConvenio:carteirinha_convenio,
        validadeConvenio: validade_convenio,
        planoConvenio: plano_convenio } = payload
    
        const text = `UPDATE paciente SET (nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha) = ($1, $2, $3, $4, $5, $6, $7, $8)  WHERE id = ${id} RETURNING *`
        const values = [nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha]

        const textSemSenha = `UPDATE paciente SET (nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio) = ($1, $2, $3, $4, $5, $6, $7)  WHERE id = ${id} RETURNING *`
        const valuesSemsenha = [nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio]
    const client = await db.connect()
    try{
        if(!senha){
        const res = await client.query(textSemSenha,valuesSemsenha)
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

exports.findAndDeletePaciente = (async(id)=>{
    const textHorario = 'DELETE FROM horario WHERE id_cliente = $1'
    const textPaciente = 'DELETE FROM paciente WHERE id = $1 RETURNING *'
    const values = [id]
    const client = await db.connect()
    try{
        await client.query(textHorario,values)
        const res = await client.query(textPaciente,values)
 
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }finally{
        client.release()
    }
})

exports.findPacienteById = (async(payload) =>{
    const {id_cliente: id} = payload
    const text = 'SELECT * FROM paciente WHERE id = $1'
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