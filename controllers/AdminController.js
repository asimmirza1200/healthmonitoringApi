const Admin =require( "../models/AdminModel");
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const loginAdmin =  (req, res,next) =>{
    let  req2=JSON.stringify(req.body).replace('}":""}',"}").replace('{"{',"{").replace(/\\/g,"")
    req2=JSON.parse(req2)
    let email=req2.email
    let password=req2.password
    let token=req2.token
   console.log(req2)
    Admin.find({"email":email}).then(response =>{
        console.log(response)
        if(response!=null){
            console.log(response[0].password+""+password)

            if(response[0].password===password){

                const accessToken = jwt.sign({ email: response[0].email,  password: response[0].password }, accessTokenSecret);
                    response[0].accessToken=accessToken
                    response[0].firbaseToken=token

                    let updateToken= {
                        accessToken: accessToken,
                        firbaseToken:token

                    }
                    Admin.findByIdAndUpdate(response[0]._id,{$set :updateToken}).then(response1 =>{
                    
                            res.json({
                                message: "Successfully Login",
                                data:response[0],
                                code:"202",
                                status:"true"  
                            })
                    })
                    .catch(error=>{
                        res.json({
                            message:error
                        })
                    })


            }else{
                res.json({
                    message: "invalid Login Credential1s",
                    data:[],
                    code:"505",
                    status:"false"  
                })
            }
        }else{
            res.json({
                message: "invalid Login Credenti3als",
                data:[],
                code:"505",
                status:"false"  
            })
        }
      
    })
    .catch(error=>{
        res.json({
            message: error.toString(),
            data:[],
            code:"505",
            status:"false"  
        })
    })
      
};


module.exports={
    loginAdmin
}