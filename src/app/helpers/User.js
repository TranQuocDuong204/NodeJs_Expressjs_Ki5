function User(req, res, next) {
    console.log(req.body.value);
    const save = req.cookies.value;
    if(save.role === 'USER') {
        console.log("YOU ARE IS USER");
        next();
    }else {
        console.log('You not admin ');
        res.redirect('/auth');
    }
}

export default User;