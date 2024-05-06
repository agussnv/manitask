var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();

//const cursor = uri.collection('test_js').find({ texto: 'hola' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressoo' });
  
});
module.exports = router;
