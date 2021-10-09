import mongoose from 'mongoose'

const validateUnit = (Type : String) => {
    return Type.toUpperCase() === "NOS" || Type.toUpperCase() === "METRE" || Type.toUpperCase() === "KG"; 
}

const isNumeric = (Num : String) => {
    return !isNaN(Number(Num));
}

const ItemSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Unit : {
        type : String,
        required : true,
        validate : [ validateUnit , "It should be either `nos` , `metre` or `kg`" ]
    },
    Type : {
        type : String,
        required : true
    },
    SubType : {
        type : String,
        required : true
    },
    Quantity : {
        type : String,
        required : true,
        validate : [ isNumeric ,"Quantity should be a numeric value" ]
    }
});

export default mongoose.model('Item', ItemSchema);