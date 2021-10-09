import express from 'express'
import Enterprise from '../models/Enterprise';

const router=express.Router();

interface Enterprise {
    body : {
        Name : String,
        Address : String,
        PAN : String,
        GSTNumber : String,
        PINCode : String,
        PhoneNo : String,
        EmailID : String,
        Type : String,
    }
}

router.post("/",async (request : Enterprise,response : any) =>  {
    try {
        let newEnterprise = new Enterprise(request.body);
        let validationFail = newEnterprise.validateSync()
        if(!validationFail){
            newEnterprise.save();
            response.send("New enterprise added")     
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send("Some error happened")
    }
})

export default router;