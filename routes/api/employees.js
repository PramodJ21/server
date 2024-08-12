const express =  require("express")
const router = express.Router()
const path = require("path")
const data = {};

data.employees = require('../../data/data.json')

router.route('/')
.get((req,res)=>{
    res.json(data.employees)
})
.post((req,res)=>{
    const {id,name, email} = req.body;
    if(name && email && id){
        data.employees.push({"id":id,"name":name, "email":email})
        res.json({success: true, data: data.employees})
    }
    else{
        res.status(400).json({success: false, msg: "Please include id, name and email"})
    }
})
.put((req,res)=>{
    
})
.delete((req,res)=>{
    res.json({
        msg: "DELETE request received",
        data: data.employees
    })
})

router.route('/:id')
.get((req,res)=>{
    res.json(
        {"id":req.params.id}
    )
})
module.exports = router;