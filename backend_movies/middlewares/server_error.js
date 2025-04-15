function serverError(req, res, next) {
    res.status(500).send({ error: "server error" })
}
module.exports = serverError