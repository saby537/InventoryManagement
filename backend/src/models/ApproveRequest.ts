import mongoose, { Schema } from 'mongoose'

const validateUnit = (Type : String) => {
    return Type.toUpperCase() === "NOS" || Type.toUpperCase() === "METRE" || Type.toUpperCase() === "KG"; 
}

const isNumeric = (Num : any) => {
    return !isNaN(Num);
}

const ApproveRequestSchema = new mongoose.Schema({
    ProductName : {
        type : Schema.Types.ObjectId,
        ref : "Item",
        required : true
    },
    Unit : {
        type : String,
        required : true,
        validate : [ validateUnit , "It should be either `nos` , `metre` or `kg`" ]
    },
    Quantity : {
        type : Number,
        required : true,
        validate : [ isNumeric ,"Quantity should be a numeric value" ]
    },
    AvailableStock : {
        type : String,
        required : true,
        validate : [ isNumeric ,"Quantity should be a numeric value" ]
    },
    Comments : [{
        type : String,
        required : true,
    }],
    ApproveStatus : {
        type : String,
        required : true,
    },
    Contractor : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : true
    },
    Invoice : {
        type : String,
        required : true
    },
    DeliveryLocation : {
        type : String,
        required : true
    },
    Warehouse : {
        type : Schema.Types.ObjectId,
        ref : "Warehouse",
        required : true
    },
    ApproverID : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : false
    }
});

export default mongoose.model('ApproveRequest', ApproveRequestSchema);