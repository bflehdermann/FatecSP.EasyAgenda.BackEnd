exports.errorResponse = (title, message) => {
    if (!title || !message) throw new Error('Título e Mensagem de erro são obrigatórios!')
    return { errors: [{ title, message }]}
}
