const handleProfile = (req,res,db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
       id : id 
    }).then(user => {
        if(user.length){
            res.json(user[0]);
        }else {
            res.status(400).json("Not found")
        }
    })
    .catch(err => res.status(400).json("errorr getting user"));
}

module.exports = {
    handleProfile: handleProfile // in ES6 don't need value we can just handleProfile
};