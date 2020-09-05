module.exports = async (res, error, message = 'Wooops...', status = 500) => {
    return res.json({
        data: null,
        meta: { message, error }
    }, status);
}