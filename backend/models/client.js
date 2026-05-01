const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    tel: {
        type: String
    },
    image: {
        type: String
    },
    
    date: {
        type: Date
    }
}
)
module.exports = Client;
