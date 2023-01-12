
const router = require('express').Router();
const shortid = require('shortid');
const urlModel = require('../Models/urlModel');

router.route('/').post((req,res)=>{
  
  const userInput = req.body.url;
  const shortId = shortid.generate().slice(4);
  const addModel = new urlModel({original_Url: userInput, short_Url: shortId });
  const validUrl = userInput.match(/^((http[s]?):\/)\/?([^:\/\s]+)(\/\w+)*\/?/g);
  
  
  if ( validUrl == null ) {
    res.json({ error: 'invalid url' })
    
  } else {
    
    addModel.save()
      .then(() => res.json({original_url: userInput, short_url: shortId }))
      .catch( err => res.status(400).json('Error: ' + err))
  }  
});

router.route('/:short').get((req,res)=>{

  const findUrl = req.params.short;
  
  urlModel.find({short_Url: findUrl})
    .then(result => res.redirect(result[0].original_Url))
    .catch(err => res.status(400).json('Error: ' + err))
    
});

module.exports = router;



