module.exports = (err, req, res, next)=>{
    console.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).josn({ message: err.message || 'Server Error' });
};