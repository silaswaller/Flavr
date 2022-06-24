const mongoose = require("mongoose");



const FlavrSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    image: {
        type: String,
    },

    cookTime: {
        type: String,
    },

    serves: {
        type: String,
    },

    description: { 
        type: String,
    },

    preparation: {
        type: String,
    },

    ingredients: [String],

    recipeLiked: {
        type: Array,
        default: []
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }

}, {timestamps:true})

const Flavr = mongoose.model("Flavr", FlavrSchema);

module.exports = Flavr;