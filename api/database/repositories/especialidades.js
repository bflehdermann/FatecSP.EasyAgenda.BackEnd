const db = require('../connector')

exports.findAllEspecialidades = (async() =>{
    const text = 'SELECT * FROM especialidade'
    const client = await db.connect()
    try{
        const res = await client.query(text)
        return res.rows
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})

exports.createEspecialidade = (async(payload) =>{
    const {nome} = payload
    const text = 'INSERT INTO especialidade (nome) VALUES ($1) RETURNING *'
    const values = [nome]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})

exports.findOneEspecialidade = (async(payload)=>{
    let {nome} = payload
    const text = 'SELECT * FROM especialidade WHERE (nome) LIKE ($1)'
    const values = [nome]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})