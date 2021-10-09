import express from 'express'
import Item from '../models/Item';

const router=express.Router();

interface Items {
    body : {
        Name : String,
        Unit : String,
        Type : String,
        SubType : String,
        Quantity : String,
    }
}

router.post("/",async (request : Items,response : any) =>  {
    try {
        let newItem = new Item(request.body);
        let validationFail = newItem.validateSync()
        if(!validationFail){
            newItem.save();
            response.send("New item added")     
        }else{response.send(validationFail)}   
    } catch (error) {
        response.status(500).send("Some error happened")
    }
})

export default router;