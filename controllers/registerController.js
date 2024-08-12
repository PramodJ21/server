const User = require('../data/User')
const bcrypt = require('bcrypt')

const handleNewUser = async(req,res) =>{
    const {user , pwd} = req.body;
    //username and password are not empty
    if(!user || !pwd) return res.status(400).json({success: false, msg: "Please include user and password"})
    
    //check for duplicate usernames in the db
    const duplicate = await User.findOne({username:user}).exec()
    if(duplicate) return res.sendStatus(409)// conflict
    //storing
    try{
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd,10)

        //store the new user
        const newUser = await User.create(
        {
            "username": user,
            // "roles": "User", 
            "password":hashedPwd
        }
    )
    console.log(newUser)
        
        res.status(201).json({"success":`New user ${user} created!`})
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}


module.exports = {handleNewUser}