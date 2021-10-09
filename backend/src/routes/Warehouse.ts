import express from 'express'
import Warehouse from '../models/Warehouse';

const router=express.Router();

interface Warehouses {
    body : {
        Name : String,
        Unit : String,
        Type : String,
        SubType : String,
        Quantity : String,
    }
}

router.post("/",async (request : Warehouses,response : any) =>  {
    try {
        let mewWarehouse = new Warehouse(request.body);
        let validationFail = mewWarehouse.validateSync()
        if(!validationFail){
            mewWarehouse.save();
            response.send("New warehouse added")     
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send("Some error happened")
    }
})

export default router;