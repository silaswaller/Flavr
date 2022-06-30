const mongoose = require("mongoose");



const FlavrSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [
            true, "Please input a name"
        ],
    },

    image: {
        type: String,
    },

    cookTime: {
        type: String,
        required: [
            true, "Please input the cookTime"
        ]
    },

    serves: {
        type: String,
        required: [
            true, "Please input serves"
        ],
    },

    description: { 
        type: String,
        required: [
            true, "Please input a descriptive description"
        ],
    },

    preparation: {
        type: String,
        required: [
            true, "Please input a descriptive preperation"
        ],
    },

    ingredients: [
        {
            name: {
                type: String
            }
        }
    ],

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