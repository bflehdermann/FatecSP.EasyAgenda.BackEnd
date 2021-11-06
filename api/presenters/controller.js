const { status } = require('./http')

exports.controller = controller => async (req, res, next) => {
    try {
        await controller(req, res, next)
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error(error)
        res._rt_send_error(status.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR')
    }
}
