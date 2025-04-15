function notFound(req, res, next) {
    res.status(404).send({ error: 'notfound' })
}

module.exports = notFound