
exports.success = (req, res, message = "ok", status = 200) => {
    res.status(status).json({
        error: false,
        status: status,
        body: message
    })
}

exports.error = (req, res, message = "Internal server error", status = 500) => {
    res.status(status).json({
        error: true,
        status: status,
        body: message
    })
}