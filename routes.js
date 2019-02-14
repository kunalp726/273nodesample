var express = require('express');
var path=require("path");
var router = express.Router();
router.use(express.static(path.join(__dirname + '../views')));
var credentials={
    name:"admin",
    pass:"admin"
};

var users=[];
function checkSignIn(req, res,next){
    console.log("inside check sign in "+req.session.user);
    if(req.session.user){
       next();    
    } else {
      res.redirect("/");
    }
 }
 router.get("/logout",function(req,res){
     req.session.user=undefined;
     res.redirect("/");
 });
 router.get("/delete/:id",checkSignIn,function(req,res){
     var id=req.params.id;
     users=users.filter((users)=>{
         return users.studentid!=id;
     });
     console.log(JSON.stringify(users));
  //   res.render("userreport",{users:users});
  res.redirect("/students/userreport");
 });
router.get("/userreport",checkSignIn,function(req,res){
    res.render("userreport",{users:users});
});
 router.post("/userreport",checkSignIn,function(req,res){
   let {name,studentid,department}=req.body;
    users.push({
        name:name,
        studentid:studentid,
        department:department
    });
    console.log("inside user report post");
    res.render("userreport",{users:users});
 });
router.get("/userinformation",checkSignIn,function(req,res){
    res.render('userinformation');
});

router.post("/userinformation",function(req,res){

       
        if(req.body.username==credentials.name && req.body.password==credentials.pass){
        res.cookie('name', 'admin');
        req.session.user={name:req.body.username,pass:req.body.password};
        res.render('userinformation');
        }else{
           res.redirect('/');
        }
   
});



module.exports=router;