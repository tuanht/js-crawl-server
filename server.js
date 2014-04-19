var express = require('express'),
    report = require('./routes/report');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/report', report.findAll);
//app.get('/report/:id', report.findById);
app.post('/report', report.addReport);
//app.put('/report/:id', report.updateWine);
//app.delete('/report/:id', report.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');

