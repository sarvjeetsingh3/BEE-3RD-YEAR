function m1(req, res, next) {
    console.log("running 1");
    req.userId = "4";
    next(); 
}

function m2(req, res, next) {
    console.log("running 2");
    console.log(req.userId);
    req.isAdmin = true;
    next(); 
}

module.exports = { m1, m2 };
