import express from 'express'
import mongoose from 'mongoose';
import AddStock from '../models/AddStock';
import Enterprise from '../models/Enterprise';
import OrderRequest from '../models/OrderRequest';
import ApproveRequest from '../models/ApproveRequest';
import Item from '../models/Item'

const router=express.Router();

interface OrderRequestPost {
    body : {
        _id? : any,
        ProductName : string,
        ProductNameString : String,
        Unit : String,
        Quantity : Number,
        Supplier : string,
        Contractor : string,
        Invoice : String,
        DeliveryLocation : String,
        Warehouse : string
    },
    headers : {
        email : String
    }
}

interface EnterpriseGetByInvoice {
    body : {
        Invoice : String
    },
    headers : {
        email : String
    }
}

router.post("/",async (request : OrderRequestPost,response : any) =>  {
    try {
        let data = {
            ...request.body,
            _id : new mongoose.Types.ObjectId()
        }
        let newOrderRequest = new OrderRequest(data)
        let validationFail = newOrderRequest.validateSync()
        if(!validationFail){
            Enterprise.findOne({
                EmailID : request.headers.email
            },async function(err : any , enterprise : any){
                if( ! err ) {
                    let item = await Item.findOne({Name : request.body.ProductNameString })
                    enterprise.Orders.push(data._id)
                    let newApproveRequest = new ApproveRequest({
                        ...request.body,
                        AvailableStock : item.Quantity,
                        Comments : [],
                        ApproveStatus : "NO",
                    })

                    newApproveRequest.save();
                    newOrderRequest.save();   
                    enterprise.save();
                    response.send("New Order Request added")     

                }else{
                    response.send("User Not Found")
                }
            })    
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get("/",async (request : any,response : any) =>  {
    try {
        OrderRequest.find()
        .populate(["ProductName","Supplier","Warehouse","Contractor"])
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