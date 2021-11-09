const { findEspecialidades } = require("../../database/repositories/especialidades")
const { controller } = require("../../presenters/controller")
const { status } = require("../../presenters/http")

exports.middleware = []

exports.handler = controller(async(req,res)=>{
    const especialidades = await findEspecialidades()
    res.status(status.OK).json(especialidades)
})