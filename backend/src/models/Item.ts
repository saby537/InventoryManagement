import mongoose from 'mongoose'

const validateUnit = (Type : String) => {
    return Type.toUpperCase() === "NOS" || Type.toUpperCase() === "METRE" || Type.toUpperCase() === "KG"; 
}

const isNumeric = (Num : any) => {
    return !isNaN(Num);
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
        type : Number,
        required : true,
        validate : [ isNumeric , "It should be a number" ]
    }
});

export default mongoose.model('Item', ItemSchema);