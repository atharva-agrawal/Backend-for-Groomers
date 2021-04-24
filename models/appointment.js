const mongoose = require('mongoose');
const {Schema} = mongoose;

const AppointmentSchema = new Schema({
    appointment_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    appointment_date: {
        type: Date,
        required: true
    },
    appointmet_duration: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;