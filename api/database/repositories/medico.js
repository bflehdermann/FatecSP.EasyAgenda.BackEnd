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
    }
})

exports.createMedico = (async(payload) =>{
    const{nome,crm,endereco,cep,cidade,estado,email,senha} = payload
    const text = 'INSERT INTO medico (nome,crm,endereco,cep,cidade,estado,email,senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [nome,crm,endereco,cep,cidade,estado,email,senha]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})

exports.findAndUpdateMedico = (async( id, payload )=>{
    const{nome,crm,endereco,cep,cidade,estado,email,senha} = payload
    const text = `UPDATE medico SET (nome,crm,endereco,cep,cidade,estado,email,senha) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id = ${id} `
    const values = [nome,crm,endereco,cep,cidade,estado,email,senha]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})