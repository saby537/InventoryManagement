import express from 'express'
import AddStock from '../models/AddStock';
import ApproveRequest from '../models/ApproveRequest';

const router=express.Router();

interface ApproveRequestPost {
    body : {
        ProductName : string,
        Unit : String,
        Quantity : Number,
        AvailableStock : String,
        Comments : String,
        ApproveStatus : String,
        Contractor : string,
        Invoice : String,
        DeliveryLocation : String
        Warehouse : string,
        ApproverID : string
    }
}

interface ApproveRequestGetByInvoice {
    body : {
        Invoice : String,
    }
}

router.post("/",async (request : ApproveRequestPost,response : any) =>  {
    try {
        ApproveRequest.findOneAndUpdate({
            Invoice : request.body.Invoice
        },{
            $set : {
                ApproveStatus : request.body.ApproveStatus,
                ApproverID : request.body.ApproverID
            },
            $push : {
                Comments : request.body.Comments
            }
        })   
        response.send("Request Approval Updated");
    } catch (error) {
        response.status(500).send({"Error" : error})
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        ApproveRequest.find()
        .populate(["ProductName","Contractor","Warehouse","ApproverID"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/invoice/",async (request : ApproveRequestGetByInvoice,response : any) =>  {
    try {
        ApproveRequest.find({Invoice : request.body.Invoice})
        .populate(["ProductName","Contractor","Warehouse","ApproverID"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;