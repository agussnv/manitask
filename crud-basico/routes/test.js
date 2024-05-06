var express = require('express');
var router = express.Router();

exports.getData = (req, res) => {
  res.send({ data: 1 })
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Esto es un test solamente");
});


router.get('/ping', function(req, res, next) {
    res.send("pongo " + new Date().toLocaleDateString());
  });

module.exports = router;