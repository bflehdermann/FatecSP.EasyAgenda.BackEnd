const db = require('../connector')

exports.findEspecialidades = (async() =>{
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
    const{nome} = payload
    const text = 'INSERT INTO especialidade (nome) VALUES ($1)'
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