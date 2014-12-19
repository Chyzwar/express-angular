var express = require('express');
var router = express.Router();
var path  = require('path');

/* GET home page. */
router.get('*', function(req, res) {
	main_path = path.resolve(__dirname , '../public/main.html');
	console.log(main_path);
	res.sendFile(main_path);
});


module.exports = router;
