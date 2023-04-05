const express = require('express');
const router = express.Router();
const User   = require('../models/user-db')
// show user
router.get('/user/:id',async(req,res)=>{
      try {
        let id = req.params.id;
        let user = await User.findById(id);
        res.render('user/showUser.ejs',{user});
      } catch (error) {
        console.log("error while getting user",error);
      }
})
router.get('/user/:id/edit',async(req,res)=>{
    try {
        let id = req.params.id;
        let user = await User.findById(id);
        res.render('user/update.ejs',{user});
    } catch (error) {
       console.log('unknown error') 
    }
})
router.patch('/user/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let updatedUser = {
            username: req.body.username,
            isAdmin:req.body.isAdmin,
            name:req.body.name,
            cgpa:req.body.cgpa
        }
        await User.findByIdAndUpdate(id,updatedUser);
        res.redirect(`/user/${id}`)
    } catch (error) {
        console.log("error while updating user");
    }
})
router.delete('/user/:id',async(req,res)=>{
    try {  
        let id = req.params.id;
        await User.findByIdAndDelete(id);
        res.redirect(`/login`)
    } catch (error) {
        console.log("error while deleting job",error);
    }
    
})
module.exports = router;