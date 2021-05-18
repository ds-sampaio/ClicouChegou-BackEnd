// const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors') 
 
module.exports = app => {
    
     app.use(bodyParser.json())
    //  app.use(express.json())
    //  app.use(express.urlencoded({
    //      extended: true 
    //  }))
 
    app.use(cors({
        origin: '*' 
    }))
}