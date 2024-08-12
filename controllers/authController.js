const userDB = {
    users: require('../data/users.json'),
    setUsers: function(data){this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const handleLogin = async(req,res)=>{
    const {user , pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({success: false, msg: "Please include user and password"})
    
    const foundUser = userDB.users.find(person=>person.username === user)
    if(!foundUser) return res.status(401).json({success: false, msg: "User not found"})

    const match = await bcrypt.compare(pwd,foundUser.password)
    if(match){
        //create JWTs
        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        
        //store refresh token in db
        const otherUsers = userDB.users.filter(person.username !== foundUser.username)
        const currentUser = {...founderUser, refreshToken}
        userDB.setUsers([...otherUsers,currentUser])
        
        await fsPromises.writeFile(
            path.join(__dirname,'..','data','users.json'),
            JSON.stringify(userDB.users)
        )
        read.cookie('jwt',refreshToken,{httpOnly:true, maxAge: 24*60*60*1000})
        res.json({ acessToken })
    }else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}