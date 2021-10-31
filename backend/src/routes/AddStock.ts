import express from 'express'
import mongoose from 'mongoose';
import AddStock from '../models/AddStock';
import Item from '../models/Item';

const router=express.Router();

interface AddStockPost {
    body : {
        Name : string,
        Type : string,
        SubType : string,
        ProductName : string,
        Unit : String,
        Quantity : Number,
        Supplier : string,
        Warehouse : string,
        Invoice : String,
        User : string
    }
}
interface EnterpriseGetByInvoice {
    body : {
        Invoice : String,
    }
}

router.post("/",async (request : AddStockPost,response : any) =>  {
    try {
        const session = await mongoose.startSession();
        session.startTransaction()
        // let newAddStock = new AddStock(request.body)
        // let validationFail = newAddStock.validateSync()
        // if(!validationFail){
        //     let val = await Item.updateOne({
        //         Name : request.body.ProductName,
        //         Unit : request.body.Unit,
        //         Type : request.body.Type,
        //         SubType : request.body.SubType,
        //     },{
        //         $inc : {
        //             Quantity : request.body.Quantity
        //         }
        //     }).session(session);
        //     if(! val.nModified ) {
        //         let newItem = new Item(request.body);
        //         let validationFail = newItem.validateSync()
        //         if(!validationFail){
        //             newItem.save();
        //             newAddStock.save(); 
        //         }else{response.send(validationFail)}   
        //     }else{
        //         newAddStock.save(); 
        //     }
        
        await AddStock.create([{
            Quantity : request.body.Quantity,
            Unit : request.body.Unit,
            ProductName : request.body.ProductName,
            Supplier : request.body.Supplier,
            Warehouse : request.body.Warehouse,
            User : request.body.User,
            Invoice : request.body.Invoice
        }],{
            session : session
        })
        await Item.updateOne({
            Name : request.body.Name,
            Unit : request.body.Unit,
            Type : request.body.Type,
            SubType : request.body.SubType,
        },{
            $inc : {
                Quantity : request.body.Quantity
            }
        }).session(session);
        await session.commitTransaction(); 
        session.endSession();
        response.send("Item and Stock updated")
        // }else{response.send({"validate":validationFail})}   
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