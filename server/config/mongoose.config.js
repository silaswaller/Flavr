const mongoose = require("mongoose");


mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log(`You are connected to ${process.env.DB_NAME} database`)
    })
    .catch((err)=>{
        console.log(`Error connecting the ${process.env.DB_NAME} database`, err)
    })