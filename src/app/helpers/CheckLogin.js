function CheckLogin(req, res, next) {
    const loginCheck = req.cookies.token;

    if(loginCheck) {
        res.redirect("/posts");
    }else {
        next();
    }
}

export default CheckLogin;