const express = require("express");
const router = express.Router();
const flash = require('connect-flash');
const {isAdmin,isLoggedin} = require('../middlewares/index')
const notif = require('../models/notification-db')
const Job = require('../models/index-db')
// index
// router.get('/' ,async (req,res)=>{
//     try {
//         let findjobs = await Job.find({});
//         res.render('landing.ejs',{findjobs});
//     } catch (error) {
//         console.log("error while fethcing the jobs",error)
//     }
// })
router.get('/' ,async(req,res)=>{
    const alljobs = await Job.find({})
    res.render("show.ejs" ,{alljobs})
})
//new
router.get('/jobs/new',isLoggedin,isAdmin,(req,res)=>{
    res.render("new.ejs")
})
//create
router.post('/jobs',async(req,res)=>{
    try {
        const newobj = new Job({
            name:req.body.name,
            address:req.body.address,
            image:req.body.image,
            package:req.body.package
        })
        await newobj.save();
        let newNotification = new notif({
            title:'A new job has been posted',
            details:req.body.name
        })
        await newNotification.save();
        req.flash('success', 'job successfully posted');
        res.redirect("/");
    } catch (error) {
        console.log("error while posting a new job",error);
    }
    
})
//show
router.get('/jobs/:id/',async(req,res)=>{
    try {
        let id = req.params.id;
        let found = await Job.findById(id);
        res.render('jobpage_id.ejs',{found})
    } catch (error) {
        console.log("erorr while fetching the job",error)
    }
 
})
//edit
router.get('/jobs/:id/edit',async(req,res)=>{
 try {
    let found = await Job.findById(req.params.id)
    res.render("update.ejs",{found})

 } catch (error) {
    console.log("error while fetching the job")
 }
})

//upadate
router.patch('/jobs/:id',async (req,res)=>{
    try {
        let id = req.params.id;
        let updated = {
            name:req.body.name,
            address:req.body.address,
            image:req.body.image,
            package:req.body.package
        }
        await Job.findByIdAndUpdate(id,updated)
        res.redirect('/')
       
    } catch (error) {
        console.log("error while updating job",error);
    }
})
//delete
router.delete('/jobs/:id',async(req,res)=>{
    try {  
        let id = req.params.id;
        await Job.findByIdAndDelete(id);
        res.redirect('/')
    } catch (error) {
        console.log("error while deleting job",error);
    }
    
})
module.exports = router