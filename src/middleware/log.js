exports.logRequestTime = (req, res, next) =>{
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log( 'Method : ' ,req.method, ', Time : ' , duration, 'ms');
    });
    next();
}

