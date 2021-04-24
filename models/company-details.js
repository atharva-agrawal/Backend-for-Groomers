const Address = require("./address");
module.exports = {
    name: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: String,
            required: true 
        },
        longitude: {
            type: String,
            required: true
        }
    },
    phone_number: {
        type: Number,
        required: true
    },
    address: Address,
    email_id: {
        type: String,
        required: true
    },
    description: {
        type: String
    }


};