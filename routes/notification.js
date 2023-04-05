const express = require("express");
const router = express.Router();
const {isAdmin,isLoggedin} = require('../middlewares/index')
const notif = require('../models/notification-db')
router.get('/notification',isLoggedin,async(req,res)=>{
    try {
        let notifications = await notif.find({});
        res.render('notifications/showNotificaion.ejs',{notifications});
    } catch (error) {
        console.log("error while fecthin the notiffiations");
    }
})
router.get('/notification/new',isAdmin,isLoggedin,(req,res)=>{
    res.render('notifications/notification.ejs');
});

router.post('/notification',isAdmin,isLoggedin,async(req,res)=>{
    try {
        let newNotification = new notif({
            title:req.body.title,
            details:req.body.details
        })
        await newNotification.save();
       return  res.redirect('/notification');
    } catch (error) {
        console.log('error while psoting notificaion');
        return res.redirect('/notification');
    }
})
router.delete('/notification/:id',isAdmin,isLoggedin,async(req,res)=>{
    try {
        let id = req.params.id;
        await notif.findByIdAndDelete(id);
        res.redirect('/notification');
    } catch (error) {
        console.log("error while deleting a notificaion");
    }
})
module.exports = router;