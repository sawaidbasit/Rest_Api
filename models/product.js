const mongoose = require('mongoose')

const productScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price must be Provided"]
    },
    featured: {
        type:  Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.9
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productScheme)