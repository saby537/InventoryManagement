import express from 'express'
import Enterprise from '../models/Enterprise';

const router=express.Router();

interface EnterprisePost {
    body : {
        Name : String,
        Address : String,
        PAN : String,
        GSTNumber : String,
        PINCode : String,
        PhoneNo : String,
        EmailID : String,
        Type : String,
        Orders : any
    }
}

interface EnterpriseGetByEmail {
    body : {
        EmailID : String,
    }
}

router.post("/",async (request : EnterprisePost,response : any) =>  {
    try {
        request.body.Orders = [];
        let newEnterprise = new Enterprise(request.body);
        let validationFail = newEnterprise.validateSync()
        if(!validationFail){
            newEnterprise.save();
            response.send("New enterprise added")     
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/",async (request : any,response : any) => {
    try {
        let finder = await Enterprise.find().populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/email/",async (request : EnterpriseGetByEmail,response : any) => {
    try {
        let finder = await Enterprise.find({
            EmailID : request.body.EmailID
        }).populate("Orders");
        response.send(finder);
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;