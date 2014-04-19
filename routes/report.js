var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// Config DB connection properties
var dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'ds053648.mongolab.com',
	dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 53648,
	dbName = process.env.OPENSHIFT_APP_NAME || 'crawl';
dbPort = parseInt(dbPort);
    
var dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME || 'mongouser',
	dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '123@@';
// End config
 
var server = new Server(dbHost, dbPort, {auto_reconnect: true});
db = new Db(dbName, server);

// Open and authenticate database connection
db.open(function(err, db){
	if(err){ throw err };
	db.authenticate(dbUser, dbPass, function(err, res){
		if(err){ throw err };
	});
});

// function for find all record in `report` collection
exports.findAll = function(req, res) {
    db.collection('report', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

// Add report to `report` collection
exports.addReport = function(req, res) {
	// Allow cross-domain request
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
    var report = req.body;
    console.log('Adding report: ' + JSON.stringify(report));
    db.collection('report', function(err, collection) {
        collection.insert(report, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
