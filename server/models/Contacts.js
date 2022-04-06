const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})

const ContactModel = mongoose.model("contacts", ContactSchema)
module.exports = ContactModel