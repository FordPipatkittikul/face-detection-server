const handleSignin = (req,res,db,bcrypt) => {
    db.select('email','hash').from('login')
        .where("email", "=", req.body.email)
        .then(data =>{
            const isValidPass = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValidPass){
                return db.select('*').from('users')
                  .where('email','=', req.body.email)
                  .then(user => {
                    res.json(user[0]);
                  })
                  .catch(err => res.status(400).json('unable to get user'));
            } else{
                res.status(400).json('wrong credentails')
            }
        })
        .catch(err => res.status(400).json('wrong credentails'));
}

module.exports = {
    handleSignin: handleSignin
};