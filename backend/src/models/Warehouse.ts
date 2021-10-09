import mongoose from 'mongoose'

const WarehouseSchema = new mongoose.Schema({
    Address : {
        type : String,
        required : true
    },
    City : {
        type : String,
        required : true,
    },
});

export default mongoose.model('Warehouse', WarehouseSchema);