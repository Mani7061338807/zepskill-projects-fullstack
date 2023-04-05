let express = require('express');
let router = express.Router();
let passport = require('passport');
let User = require('../models/user-db')


router.get('/register',(req,res)=>{
    res.render('user/register.ejs')
})
router.post('/register',async(req,res)=>{
   // making a model instance
    const user = new User({
        username: req.body.username,
        isAdmin:req.body.isAdmin,
        name:req.body.name,
        cgpa:req.body.cgpa
    })
    // hashing and salting and saving
    const registeredUser  = await User.register(user,req.body.password);

   req.login(registeredUser,(err)=>{
      if(err){
        console.log("error while register");
      }
        res.redirect('/');
   })
})
router.get('/login',(req,res)=>{
    res.render('user/login.ejs');
})
router.post('/login',passport.authenticate('local',{
  failureRedirect:'/login'
}),(req,res)=>{
  res.redirect('/')
});
router.get('/logout',(req,res)=>{
  req.logOut((err)=>{
    if(err){
      console.log("error while logout");
    }
    res.redirect('/login')
  });
  // res.redirect('/login');
})
module.exports = router;