
var http = require ('http');	     // For serving a basic web page.
var querystring = require('querystring');
var _ = require('underscore');
var mongoose = require ("mongoose"); // The reason for this demo.
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Grid = require('gridfs-stream');
var app = express();
var fs = require('fs');
var api = require('infusionsoft-api');


app.use(cors());
app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '50mb',
  extended: true
}));


var infusionsoft = new api.DataContext('km260', '53cb5bf5adb610a65aa0a93206e2535b');


// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/test';



// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;
var gfs = Grid(conn.db);

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



var userSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    name: {type: String, lowercase: true, trim: true,required:true,unique:true},                    
    facebookID: String,
    photoURL: String,
    infusionsoftID: Number,  //this is the infusionsoft ID
    photoID: String,
    dropIns: { type: mongoose.Schema.Types.Mixed , default: [] }, //[boxID,boxName,boxLogoID,dropinDate,verified]
    goodStanding:Boolean,
    settings: { type: mongoose.Schema.Types.Mixed, default: {} },
    email:{
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    
}, { versionKey: false });

var dropInSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    date:  { type: String, required:true },  //a string of the visit date
    boxID:mongoose.Schema.Types.ObjectId, 
    userID:mongoose.Schema.Types.ObjectId,
    verified: String,                  //'unverified','scanned','proximity','code'
    review: { type: String, default: '' },   //text of review
    rating: Number,                    //0-5 stars

    
}, { versionKey: false });

var boxSchema = new mongoose.Schema({
    cDate: { type: Date, default: Date.now },   //date item was created
    name: { type: String, trim: true,required:true,unique:true},   //name of event
    logoID: String,   //the id for the picture in gridfs
    infusionsoftID: Number,  //this is the infusionsoft ID
    contactInfo: { type: mongoose.Schema.Types.Mixed , default: {} },    //object with all the contact info we need
    address: { type: mongoose.Schema.Types.Mixed , default: {} },    //object with address info
    email:{
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    website:{type: String, lowercase: true, trim: true},
    hours:{type: String, trim: true},
    dropInPolicy:{type: String, trim: true},
    dropInRate: Number,
    dropInOffer:{type: String, trim: true},
    latitude:Number,
    longitude:Number,
    waiverRequired:Boolean,
    yelpLink: {type: String, lowercase: true, trim: true},

    admins: { type: mongoose.Schema.Types.Mixed , default: [] }, //[adminUserID, [rights]]
    dropIns: { type: mongoose.Schema.Types.Mixed , default: [] }, //[userID,userName,dropinDate,verified]

}, { versionKey: false });


var Users = mongoose.model('twcUsers', userSchema);
var Boxes = mongoose.model('twcBoxes', boxSchema);
var DropIns = mongoose.model('twcDropIns', dropInSchema);
// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

app.get('/', function(req, res){
  res.redirect('/index.html');
  //res.send('our home');
});


app.use(express.static(__dirname + '/public'));



router.get('/', function(req, res) {
    res.json({ success: 'hooray! welcome to our api!' });   
});

// ----------------------------------------------------


router.get('/test', function(req, res) {
    //read from mongodb
    console.log(req.query)

    
      Users.find({'infusionsoftID':req.query.id},function(err, users) {
            if (err){
                res.json({ error: err });
            }else{
                console.log(users)
                res.json(users);
            }
        });

    
});
router.post('/checkBoxLogin', function(req, res) {
    //read from mongodb
    console.log(req.body)

    //first, look for that email
    infusionsoft.ContactService
        .findByEmail(req.body.email, ['Id', 'FirstName', 'LastName','Email','PostalCode'])
        .then(function(output){
            console.log(output)
            if(output.length==0){
                res.json({status:'fail, no record found for that email'});
                return;
            }
            _.each(output,function(IFuser){
                console.log(IFuser)
                if(IFuser.PostalCode == req.body.zip){
                    console.log('yes',IFuser)
                    
                    //now, lets check the database for a user
                    Boxes.find({'infusionsoftID':IFuser.Id},function(err, users) {
                        if (err){
                            res.json({ error: err });
                        }else{
                            if(users.length>0){
                                //here is where we found a user
                                res.json(users[0]);
                                return;
                            }else{
                                //here we should make a user
                                res.json({status:'no box found'});
                                return;
                            }
                        }
                    });
                }else{
                    res.json({status:'fail, zip does not match'});
                    return;
                }
            });
        });
});


var getCreateUser = function(res, IFuser,fbID, fbURL){
    if(!IFuser){return;}
     //now, lets check the database for a user
    Users.find({'infusionsoftID':IFuser.Id},function(err, users) {
        if (err){
            res.json({ error: err })
            return;
        }else{
            if(users.length>0){
                //here is where we found a user
                console.log('return1',users[0])


                //when we find this, we need to edit the user first to add the facbookID
                var user = users[0];
                console.log('facebookID',fbID)
                if(fbID){
                    user.facebookID = fbID;
                    user.photoURL = fbURL;
                    console.log('user',user)
                    user.save(function(err,user) {
                        if (err){
                            console.log('error in saving facebookID')
                        }else{
                            console.log('saved facebookID')
                        }
                    });
                }

                console.log('return stuff now')
                res.json(user);
                return;
            }else{
                //here we should make a user
                var userData = {
                    name: IFuser.FirstName+' '+IFuser.LastName,                    
                    infusionsoftID: IFuser.Id,  //this is the infusionsoft ID
                    goodStanding:true,
                    email:IFuser.Email
                }
                if(fbID){
                    userData.facebookID = fbID;
                    userData.photoURL = fbURL;
                }
                new Users(userData).save(function(err,user) {
                    if(err){
                        res.json({ error: err });
                        return;
                    }else{
                        console.log('return2',user)
                        res.json(user);
                        return;
                    }
                });
            }
        }
    });
}


router.post('/checkLogin', function(req, res) {
    //looing for email, zip and fbID

    //read from mongodb
    console.log(req.body)

    //first, look for that email
    infusionsoft.ContactService
        .findByEmail(req.body.email, ['Id', 'FirstName', 'LastName','Email','PostalCode'])
        .then(function(output){
            console.log(output)
            if(output.length==0){
                res.json({status:'fail, no record found for that email'});
                return;
            }
            //first, if we only have one response, and we have a facebook ID, lets just return it
            if(output.length==1 && !req.body.zip && req.body.fbID.length){
                getCreateUser(res,output[0],req.body.fbID,req.body.fbURL);
                return;
            }

            //if that doesn't work, look through all the users and find the one with the right zip.
            _.each(output,function(IFuser){
                console.log(IFuser)
                if(IFuser.PostalCode == req.body.zip){
                    console.log('yes1',IFuser)
                    getCreateUser(res,IFuser,req.body.fbID,req.body.fbURL);
                    console.log('sent stuff')
                    return;
                }else{
                    res.json({status:'fail, zip does not match'});
                    //return;
                }
            });
        });
});


router.post('/checkFB', function(req, res) {
    //fbID
    //read from mongodb
    console.log(req.body)
    Users.find({'facebookID':req.body.fbID},function(err, users) {
        if (err){
            res.json({ error: err })
            return;
        }else{
            if(users.length>0){
                //here is where we found a user
                console.log('return1',users[0])
                res.json(users[0]);
                return;
            }else{
                res.json({'error':'no user found'});
                return;

            }
        }
    });
    
});









router.get('/logo', function(req, res) {
    //read from mongodb
    console.log("yep:"+req.query.id)
    if(!!req.query.id){
        var readstream = gfs.createReadStream({
         _id: req.query.id
        });

        readstream.on('error', function (err) {
          console.log('An error occurred!', err);
          throw err;
        });

        readstream.pipe(res);
    }
    
});

router.post('/loadLogo', function(req, res) {
  if( req==undefined){
    res.json({ status: 'No Image' });
  }else{
    var writestream = gfs.createWriteStream({});
    req.pipe(writestream);
    writestream.on('close', function (file) {
        // do something with `file`
        console.log('Written To gridfs:'+file._id);
        res.json({ status: 'Saved',id:file._id });
    });
  }
});


// on routes that end in /users
// ----------------------------------------------------
router.route('/users')
    .post(function(req, res) {
        new Users(req.body).save(function(err,user) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(user);
            }
        });
    })

    .get(function(req, res) {
        Users.find(function(err, users) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(users);
            }
        });
    });

router.route('/users/:user_id')

    // get the review with that id
    .get(function(req, res) {
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(user);
            }
        });
    })
    // update the user with this id
    .put(function(req, res) {
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: err });
            }
            _.extend(user,req.body).save(function(err,user) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(user);
                }
            });

        });
    })
        //delete user
    .delete(function(req, res) {
        //first, get the user and see if it has any reviews
        Users.findById(req.params.user_id, function(err, user) {
            if (err){
                res.json({ error: 'error getting user: ' +err });
            }else{
                Users.remove( {_id: user._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing lift: ' +err });
                        }else{
                            res.json({ sucess: 'removed user' });
                        }
                    }
                );
                
            }
        });
    })


// on routes that end in /dropins
// ----------------------------------------------------
router.route('/dropins')
    .post(function(req, res) {
        new DropIns(req.body).save(function(err,dropIn) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(dropIn);
            }
        });
    })

    .get(function(req, res) {
        DropIns.find(function(err, dropIns) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(dropIns);
            }
        });
    });

router.route('/dropins/:dropIn_id')

    // get the review with that id
    .get(function(req, res) {
        DropIns.findById(req.params.dropIn_id, function(err, dropIn) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(dropIn);
            }
        });
    })
    // update the dropIn with this id
    .put(function(req, res) {
        DropIns.findById(req.params.dropIn_id, function(err, dropIn) {
            if (err){
                res.json({ error: err });
            }
            _.extend(dropIn,req.body).save(function(err,dropIn) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(dropIn);
                }
            });

        });
    })
        //delete dropIn
    .delete(function(req, res) {
        //first, get the dropIn and see if it has any reviews
        DropIns.findById(req.params.dropIn_id, function(err, dropIn) {
            if (err){
                res.json({ error: 'error getting dropIn: ' +err });
            }else{
                DropIns.remove( {_id: dropIn._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing lift: ' +err });
                        }else{
                            res.json({ sucess: 'removed dropIn' });
                        }
                    }
                );
                
            }
        });
    })

// on routes that end in /reviews
// ----------------------------------------------------
router.route('/boxes')
    .post(function(req, res) {
        console.log(req.body)
        new Boxes(req.body).save(function(err,box) {
            if(err){
                res.json({ error: err });;
            }else{
                res.json(box);
            }
        });
    })

    .get(function(req, res) {
        Boxes.find(function(err, boxes) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(boxes);
            }
        });
    });

router.route('/boxes/:box_id')

    // get the review with that id
    .get(function(req, res) {
        Boxes.findById(req.params.box_id, function(err, box) {
            if (err){
                res.json({ error: err });
            }else{
                res.json(box);
            }
        });
    })
    // update the box with this id
    .put(function(req, res) {
        Boxes.findById(req.params.box_id, function(err, box) {
            if (err){
                res.json({ error: err });
            }
            _.extend(box,req.body).save(function(err,box) {
                if (err){
                    res.json({ error: err });
                }else{
                    res.json(box);
                }
            });

        });
    })
        //delete box
    .delete(function(req, res) {
        //first, get the box and see if it has any reviews
        Boxes.findById(req.params.box_id, function(err, box) {
            if (err){
                res.json({ error: 'error getting box: ' +err });
            }else{
                Boxes.remove( {_id: box._id}, 
                    function(err) {
                        if (err){
                            res.json({ error: 'error removing box: ' +err });
                        }else{
                            res.json({ sucess: 'removed box' });
                        }
                    }
                );
                
            }
        });
    })

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

app.listen(theport);



// Tell the console we're getting ready.
// The listener in http.createServer should still be active after these messages are emitted.
console.log('http server will be listening on port %d', theport);
console.log('CTRL+C to exit');

/*
[
  {
    "_id": "55d72e95c22f6803008c43bf",
    "name": "scott mahr",
    "goodStanding": true,
    "email": "scottmahr@gmail.com",
    "photoID": "55de3a7604594d03004a94c6",
    "dropIns": [],
    "cDate": "2015-08-21T13:58:45.554Z"
  },
  {
    "_id": "55de3a6a04594d03004a94c5",
    "name": "steve hogue",
    "email": "steve@travelwodclub.com",
    "goodStanding": true,
    "photoID": "55de3a9204594d03004a94c8",
    "dropIns": [],
    "cDate": "2015-08-26T22:15:06.113Z"
  },
  {
    "_id": "55d72e8cc22f6803008c43be",
    "name": "kyle hogue",
    "goodStanding": true,
    "email": "kylehogue@gmail.com",
    "photoID": "55de3af304594d03004a94ca",
    "dropIns": [],
    "cDate": "2015-08-21T13:58:36.003Z"
  },
  {
    "_id": "55df39ba047b520300f0f7c9",
    "name": "abby",
    "email": "scottmahr@gmail.com",
    "goodStanding": true,
    "photoID": "55df3991047b520300f0f7bf",
    "dropIns": [],
    "cDate": "2015-08-27T16:24:26.118Z"
  }
]*/