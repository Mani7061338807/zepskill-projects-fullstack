const express = require('express');
const router = express.Router();
const job = require('../models/index-db');
const questionDb = require('../models/question-db');
let {isAdmin,isLoggedin} = require('../middlewares/index')
// index
router.get('/jobs/:jobId/questions',isAdmin,isLoggedin,async(req,res)=>{
   
    try {
        let jobId = req.params.jobId;
        let getJob = await job.findById(jobId).populate('questions');
        let questions = getJob.questions;
        res.render('questions/index-question.ejs',{questions,jobId});
    } catch (error) {
        console.log(error);
    }
});
// show
router.get('/jobs/:jobId/questions/new',isAdmin,isLoggedin,async(req,res)=>{
      let jobId = req.params.jobId;
     
      res.render('questions/new-question.ejs',{jobId});
});
//create
router.post('/jobs/:jobId/questions',isAdmin,isLoggedin,async (req,res)=>{
    // 1. create a question
	// 2. save that question
	// 3. add that question into the corresponding job
	// 4. save new job
 
    try {
        
        let newQuestion = new questionDb(req.body.question)
        console.log(req.body.question)
        await newQuestion.save();
        let getJob = await job.findById(req.params.jobId);
        getJob.questions.push(newQuestion);
        await getJob.save();
        res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        console.log(error);
    }
});
// delete 
router.delete('/jobs/:jobId/questions/:quesId',isAdmin,isLoggedin, async(req,res)=>{
    try {
        await questionDb.findByIdAndDelete(req.params.quesId);
        res.redirect(`/jobs/${req.params.jobId}/questions`);
    } catch (error) {
        console.log(error);
    }
})

// test
router.get('/jobs/:jobId/test',isLoggedin,async(req,res)=>{
    
    try {
        let getJob = await job.findById(req.params.jobId).populate('questions');
        res.render('questions/test.ejs',{getJob});
    } catch (error) {
        console.log(error);
    }
});

router.post('/jobs/:jobId/test',isLoggedin,async(req,res)=>{
    try {
        let getJob = await job.findById(req.params.jobId).populate('questions');
        let allquestions = getJob.questions;
        let marks = 0;
        let required = 0.75 * allquestions.length;
		for (let i in allquestions) {
			console.log('user answer: ' + req.body.answers[i]);
			console.log('correct answer:' +allquestions[i].correctAns);
			if (allquestions[i].correctOption === req.body.answers[i]) {
				marks += 1;
			}
		}
		if (marks >= required) {
			return res.send(`you passed the test with ${marks} marks`);
		} else {
			return res.send(`you failed the test with ${marks} marks`);
		}
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
