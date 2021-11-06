const db = require('../connector')

exports.findUserByEmail = (async(email) =>{
    const text = 'SELECT id FROM cliente WHERE email LIKE $1'
    const values = [email]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        return err.stack
    }
})

exports.createUser = (async(nome,email, senha) =>{
    const text = 'INSERT INTO cliente (nome,email,senha) VALUES ($1, $2, $3)'
    const values = [nome,email,senha]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})