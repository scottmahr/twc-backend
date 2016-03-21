
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
var base64 = require('base64-stream');
var sendgrid  = require('sendgrid')('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');


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
    splashScreen: { type: Boolean, default: false },
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



var fields = [
    ['name','Company'],
    ['infusionsoftID','Id' ],
    ['contactInfo.FirstName','FirstName' ],
    ['contactInfo.LastName','LastName' ],
    ['contactInfo.Phone1','Phone1' ],
    ['address.street','StreetAddress1' ],
    ['address.city','City' ],
    ['address.state','State' ],
    ['address.postalCode','PostalCode' ],
    ['address.country','Country' ],
    ['email','Email' ],
    ['website','Website' ],
    ['hours','_HoursofOperation' ],
    ['dropInPolicy','_DropInPolicy' ],
    ['dropInRate','_DropInRate',function(x){return parseFloat(x.replace(/[^\d.-]/g, ''));}  ],
    ['dropInOffer','_DropInOffer0' ],
    ['latitude','_Lat',function(x){return parseFloat(x)} ],
    ['longitude','_Lng',function(x){return parseFloat(x)}  ],
    ['waiverRequired','_AdvancedWaiverNeeded0',function(x){if(x=='No'){return false;}return true;} ],
    ['yelpLink','_Yelp' ],
];

var vendorfields = [
    ['name','Company'],
    ['infusionsoftID','Id' ],
    ['email','Email' ],
    ['website','Website' ],
    ['yelpLink','_Yelp' ],
    ['BriefDescriptionofBusiness','_BriefDescriptionofBusiness'],
    ['DiscountOffer','_DiscountOffer'],
    ['DiscountCode','_DiscountCode'],
    ['OtherDiscountOffer','_OtherDiscountOffer'],
    ['DiscountOfferMemberLocations','_DiscountOfferMemberLocations'],
    ['OtherDiscountOfferifselectedabove','_OtherDiscountOfferifselectedabove'],
    ['DiscountCODEforMemberLocationsvalidforatleast60days','_DiscountCODEforMemberLocationsvalidforatleast60days'],
    ['DiscountCODEforMemberLocations','_DiscountCODEforMemberLocations'],
    ['ImageID','_ImageID'],
];



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

router.post('/helpEmail', function(req, res) {
  //First, we need to find the user and the password

    infusionsoft.ContactService
        .findByEmail(req.body.email, ['Id', 'FirstName', 'LastName','Email','PostalCode','Password'])
        .then(function(output){
            console.log(output)
            if(output.length==0){
                res.json({status:'No user found for that email', msg: 'No user found for that email'});
                return;
            }
            //now, let's send the email
            var IFuser = output[0];
             sendgrid.send({
                to:       IFuser.Email,
                from:     'info@travelwodclub.com',
                subject:  'Travel WOD Club Help Desk',
                text:     'Hi '+IFuser.FirstName+',  Here is your password: '+IFuser.Password,
                }, function(err, json) {
                  if (err) { 
                    return console.error(err); 
                    res.json({ status: 'error:'+err});
                }else{
                    console.log(json);
                    res.json({ status: 'Email sent'});
                }
              
            });
 
        });
});


router.get('/getVendors', function(req, res) {
  //First, we need to find the user and the password
    infusionsoft.Contacts
        .like(Contact.Groups, '%211%')
        .select(_.pluck(vendorfields,1))
        .orderByDescending('Id')
        .page(0)
        .take(200)
        .toArray()
        .done(function(result) {
            res.json({ status:'success',data:result});
        }); 
});




router.get('/updateBoxes', function(req, res) {
    //read from mongodb
    console.log(req.query)

    //this looks through all the IF boxes, and adds them to the data base 
    infusionsoft.Contacts
        .like(Contact.Groups, '%125%')
        .select(_.pluck(fields,1))
        .orderByDescending('Id')
        .take(500)
        .toArray()
        .done(function(result) {
            //let's put this into the right array
            var boxes = _.map(result,function(contact){
                var output = {};
                _.forEach(fields,function(field){
                    var f = field[2];
                    if(!f){
                        f = function(x){return x;}
                    }
                    if(_.has(contact,field[1])){
                        if(field[0].indexOf('.')==-1){
                            //means we just add it
                            output[field[0]] = f(contact[field[1]]);
                        }{
                            //means we need to 
                            var args =  field[0].split('.');
                            if(!_.has(output,args[0])){
                                output[args[0]] = {};
                            }
                            output[args[0]][args[1]] = f(contact[field[1]]);
                        }
                        
                    }
                });
                return output;
            });

            //now that we have the boxes, we need to update the ones in memory
            console.log('starting results')
            var results = [];
            _.forEach(boxes,function(IFbox){
                //console.log('at '+IFbox.infusionsoftID)
                Boxes.findOne({'infusionsoftID':IFbox.infusionsoftID},function(err, box) {
                    if (err){
                        results.push('error1: '+IFbox.infusionsoftID)
                    }else{
                        if(box){
                            _.extend(box,IFbox).save(function(err,newBox) {
                                if (err){
                                    console.log('ERROR'+err)
                                    results.push('ERROR box : '+err)
                                }else{
                                    results.push('updated box : '+box.infusionsoftID)
                                }
                                if(results.length==boxes.length){
                                    res.json(results);
                                }
                            });

                        }else{
                            //first, let's see if the box exists with another name
                            Boxes.findOne({'name':IFbox.name},function(err, box) {
                                if (err){
                                    results.push('error2: '+IFbox.infusionsoftID)
                                }else{
                                    if(box){
                                        _.extend(box,IFbox).save(function(err,newBox) {
                                            if (err){
                                                console.log('ERROR'+err)
                                                results.push('ERROR box : '+err)
                                            }else{
                                                results.push('updated box : '+box.infusionsoftID)
                                            }
                                            if(results.length==boxes.length){
                                                res.json(results);
                                            }
                                        });

                                    }else{
                                        //console.log(IFbox)
                                        new Boxes(IFbox).save(function(err,newBox) {
                                            if(err){
                                                console.log('ERROR'+err)
                                                results.push('ERROR box : '+err)
                                            }else{
                                                results.push('new box: '+IFbox.infusionsoftID)
                                            }
                                            if(results.length==boxes.length){
                                                res.json(results);
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    }
                    

                });

            });

            console.log('this many'+result.length)
        });

    
});

router.post('/checkBoxLogin', function(req, res) {
    //read from mongodb
    console.log(req.body)

    //first, look for that email
    infusionsoft.ContactService
        .findByEmail(req.body.email, ['Id', 'FirstName', 'LastName','Email','PostalCode','Password'])
        .then(function(output){
            console.log(output)
            if(output.length==0){
                res.json({status:'fail, no record found for that email'});
                return;
            }
            _.each(output,function(IFuser){
                console.log(IFuser)
                if(IFuser.Password == req.body.password){
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
                    res.json({status:'fail, password does not match'});
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


var checkInfusionsoft = function(req,res){
    infusionsoft.ContactService
    .findByEmail(req.body.email, ['Id', 'FirstName', 'LastName','Email','PostalCode','Password'])
    .then(function(output){
        console.log(output)
        if(output.length==0){
            res.json({status:'fail, no record found for that email'});
            return;
        }
        //first, if we only have one response, and we have a facebook ID, lets just return it
        if(output.length==1 && !req.body.password && req.body.fbID.length){
            getCreateUser(res,output[0],req.body.fbID,req.body.fbURL);
            return;
        }

        //if that doesn't work, look through all the users and find the one with the right zip.
        _.each(output,function(IFuser){
            console.log(IFuser)
            if(IFuser.Password == req.body.password){
                console.log('yes1',IFuser)
                getCreateUser(res,IFuser,req.body.fbID,req.body.fbURL);
                console.log('sent stuff')
                return;
            }else{
                res.json({status:'fail, password does not match'});
                //return;
            }
        });
    });


}


router.post('/checkLogin', function(req, res) {
    //looing for email, zip and fbID

    //so if we get a facebookID, just look for that first, no need to do anything
    if(req.body.fbID){
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
                    checkInfusionsoft(req,res);
                }
            }
        });
    }else if(req.body.email && (req.body.fbID || req.body.password)){
        checkInfusionsoft(req,res);
    }






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



//566863f85f5086141cc519cf





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
/*
    .post(function(req, res) {
        if( req==undefined){
            res.json({ status: 'No Image' });
        }else{
            //console.log(req)
            var writestream = gfs.createWriteStream({});
            req.pipe(writestream);
            writestream.on('close', function (file) {
                // do something with `file`
                console.log('Written To gridfs:'+file._id);
                Boxes.findById(req.params.box_id, function(err, box) {
                    if (err){
                        res.json({ error: err });
                    }
                    _.extend(box,{logoID:file._id}).save(function(err,box) {
                        if (err){
                            res.json({ error: err });
                        }else{
                            res.json(box);
                        }
                    });

                });

                
                //res.json({ status: 'Saved',id:file._id });
            });
        }
    });

*/
    .post(function(req, res) {
        if( req==undefined){
            res.json({ status: 'No Image' });
        }else{
            var writestream = gfs.createWriteStream({});
    
            var decoder = base64.decode();

            req.pipe(decoder).pipe(writestream);
            writestream.on('close', function (file) {
                // do something with `file`
                console.log('Written To gridfs:'+file._id);
                Boxes.findById(req.params.box_id, function(err, box) {
                    if (err){
                        res.json({ error: err });
                    }
                    _.extend(box,{logoID:file._id}).save(function(err,box) {
                        if (err){
                            res.json({ error: err });
                        }else{
                            res.json(box);
                        }
                    });

                });
            });
        }
    });



router.route('/vendors/:vendor_id')

    .post(function(req, res) {
        if( req==undefined){
            res.json({ status: 'No Image' });
        }else{
            var writestream = gfs.createWriteStream({});
    
            var decoder = base64.decode();

            req.pipe(decoder).pipe(writestream);
            writestream.on('close', function (file) {
                // do something with `file`
                console.log('Written To gridfs:'+file._id);

                console.log('updating ',parseInt(req.params.vendor_id), ' with ',String(file._id))
                
                //here is where we need to update the vendor with the image
                infusionsoft.ContactService
                    .update(parseInt(req.params.vendor_id), {'_ImageID':String(file._id)})
                    .then(function(contactID) {
                        console.log('updated a contact',contactID)
                        res.json({status:'success',Id:contactID,ImageID:file._id});
                    })
            });
        }
    });

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