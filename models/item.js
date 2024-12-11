// contains model(object) file

const mongoose = require('mongoose');

// Define item Schema
const itemSchema = new mongoose.Schema({
    _uuid: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true
    },
    quantity: { 
        type: Number, 
        default: 0 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        default: ''
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
});

// Create item Model
module.exports = mongoose.model('Item', itemSchema);
