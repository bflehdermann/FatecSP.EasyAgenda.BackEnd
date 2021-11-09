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
    }
})

exports.createPaciente = (async(payload) =>{
    const{nome,email,cpf,convenio,senha} = payload
    const {
        carteirinhaConvenio:carteirinha_convenio,
        validadeConvenio: validade_convenio,
        planoConvenio: plano_convenio } = payload
    const text = 'INSERT INTO paciente (nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [nome,email,cpf,convenio,carteirinha_convenio,validade_convenio,plano_convenio,senha]
    const client = await db.connect()
    try{
        const res = await client.query(text,values)
        return res.rows[0]
    }catch (err){
        console.log(err.stack)
        return err.stack
    }
})