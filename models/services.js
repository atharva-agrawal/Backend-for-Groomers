const mongoose = require('mongoose');
const {Schema} = mongoose;

const ServiceSchema = new Schema({
    customer_id: {
        type: String,
        required: true 
    },
    service_id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    cost: {
        type: String,
        required: true
    }

})

const Services = mongoose.model("Services", ServiceSchema);
module.exports = Services;