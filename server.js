//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    bodyParser = require('body-parser');
Object.assign=require('object-assign')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  

app.get('/ping', function(req, res){
	res.send('{ping : 1}');
});
app.get('/pay', function(req, res){
	res.render('pay.html');
});
app.post('/pay', function(req, res){
	var number=req.body.pay;
	res.send("{msg: 'Thank you. Your payment has been received. You pay: "+number+"$'}");
});
// error handling
app.get('*', function(req, res) {
    res.send("{msg:'404 Not Found'}");
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;