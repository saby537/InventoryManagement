import mongoose, { Schema } from 'mongoose'

const validateUnit = (Type : String) => {
    return Type.toUpperCase() === "NOS" || Type.toUpperCase() === "METRE" || Type.toUpperCase() === "KG"; 
}

const isNumeric = (Num : String) => {
    return !isNaN(Number(Num));
}

const AddStockSchema = new mongoose.Schema({
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
        type : String,
        required : true,
        validate : [ isNumeric ,"Quantity should be a numeric value" ]
    },
    Supplier : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : true
    },
    Warehouse : {
        type : Schema.Types.ObjectId,
        ref : "Warehouse",
        required : true
    },
    Invoice : {
        type : String,
        required : true
    },
    User : {
        type : Schema.Types.ObjectId,
        ref : "Enterprise",
        required : true
    }
});

export default mongoose.model('AddStock', AddStockSchema);