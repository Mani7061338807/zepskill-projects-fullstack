//authentication
const isLoggedin = (req,res,next)=>{
    if(req.isAuthenticated()){
      next();
    }else{
      console.log("you are not logged in");
      res.redirect('/login');
    }
}
//authorization
let isAdmin = (req,res,next) =>{
    if (req.user && req.user.isAdmin) {
		next();
	} else {
		return res.send('you dont have permission to do that');
	}
}
module.exports = {
    isAdmin,
    isLoggedin
}