require('dotenv').config()

const express = require('express');
const app = express()




app.listen(process.env.PORT,()=>{
    console.log(`Server ready on port ${process.env.PORT}`)
})


console.log('hello world');
