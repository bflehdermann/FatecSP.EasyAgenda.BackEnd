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

//findAndDeleteHorario(25)