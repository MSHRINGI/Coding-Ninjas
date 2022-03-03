module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    // console.log("Locals", res.locals);
    next();
}