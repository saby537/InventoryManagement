import express from 'express'
import AddStock from '../models/AddStock';

const router=express.Router();

interface ApproveStatusPost {
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

interface EnterpriseGetByInvoice {
    body : {
        Invoice : String,
    }
}

router.post("/",async (request : ApproveStatusPost,response : any) =>  {
    try {
        let newAddStock = new AddStock(request.body)
        let validationFail = newAddStock.validateSync()
        if(!validationFail){
            newAddStock.save(); 
            response.send("New Stock added")     
        }else{response.send({"validate":validationFail})}   
    } catch (error) {
        response.status(500).send({"Error" : error})
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        AddStock.find()
        .populate(["ProductName","Supplier","Warehouse","User"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/invoice/",async (request : EnterpriseGetByInvoice,response : any) =>  {
    try {
        AddStock.find({Invoice : request.body.Invoice})
        .populate(["ProductName","Supplier","Warehouse","User"])
        .exec(function(err : any,stock : any){
            response.send(stock);
        })
    } catch (error) {
        response.status(500).send(error)
    }
})

export default router;