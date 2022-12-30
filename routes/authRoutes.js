
const controller=require('../controllers/auth.controller')
module.exports=function(app){
    app.get('/hi',(req,res)=>{
        res.status(200).send("hi form auth");
    })
    app.post('/signup',controller.signup);
    app.post('/signin',controller.signIn);
}
