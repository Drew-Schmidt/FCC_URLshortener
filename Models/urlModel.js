const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  
  original_Url: { 
    type: String, 
    require: true 
  },
  
  short_Url: { 
    type: String, 
    unique: true
  }
})

module.exports = mongoose.model('urlModel', urlSchema);





