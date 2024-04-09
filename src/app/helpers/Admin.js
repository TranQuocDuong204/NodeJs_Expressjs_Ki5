function Admin(req, res, next) {
    console.log(req.body.value);
    const save = req.cookies.value;
    if(save.role === 'ADMIN') {
        console.log("YOU ARE IS ADMIN");
        next();
    }else {
        console.log('You not admin ');
        res.redirect('/auth');
    }
}

export default Admin;