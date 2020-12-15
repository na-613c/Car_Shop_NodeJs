var express = require('express'),
	auto = require('./requests/auto'),
    bodyParser = require('body-parser');

var app = express();
app.get('/auto', auto.findAll);

var jsonParser = bodyParser.json();
app.post('/auto/add', jsonParser, auto.add);

app.post('/auto/update', jsonParser, auto.update);

app.delete('/auto/deleteCar/:id', auto.delete);


app.use(function(err, req, res, next) { 
res.status(err.status || 500); 
res.json({ 
message: err.message, 
error: err 
});
}); 

app.listen(3000); 
console.log('Listening on port 3000...');