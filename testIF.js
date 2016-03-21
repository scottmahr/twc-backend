
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



var infusionsoft = new api.DataContext('km260', '53cb5bf5adb610a65aa0a93206e2535b');

/*
console.log('starting the stuff')
infusionsoft.ContactService
    .findByEmail('scottmahr@gmail.com', ['Id', 'FirstName', 'LastName','Email','PostalCode','Groups'])
    .then(function(output){
        console.log(output)
        
        
    });

*/

//125 Member Location

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
    ['dropInRate','_DropInRate' ],
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
];

//console.log(infusionsoft.Contacts)

/*
infusionsoft.Contacts
    .like(Contact.Groups, '%211%')
    .select(_.pluck(vendorfields,1))
    .orderByDescending('Id')
    .page(0)
    .take(30)
    .toArray()
    .done(function(result) {

        console.log(JSON.stringify(result)) 
        /*
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
        
        //console.log(result.length)
        //console.log(result);
        //console.log(boxes)
    });

 


 
console.log('test')
    infusionsoft.Contacts
    .where(Contact.Email, 'scottmahr@gmail.com')
    .first()
    .then(function(contact) {
        console.log('got a contact',contact)
        return sdk.ContactGroupAssigns
            .where(ContactGroupAssign.ContactId, contact.Id)
            .toArray();
    })
    .then(function(cgas) {
        console.log('doing something else')
        cgas.forEach(function(group) {
            console.log(group.ContactGroup, group.DateCreated);
        });
    }); 

      

infusionsoft.ContactService
    .findByEmail('scottmahr@gmail.com', ['Id', 'FirstName', 'LastName'])
    .then(function(contact) {
        console.log('got a contact',contact)
    })



infusionsoft.ContactService
    .update(337, {'LastName':'Mahr'})
    .then(function(contact) {
        console.log('updated a contact',contact)
    })

    */

    infusionsoft.ContactService
                    .update(1009, {'_ImageID':56ef3e425ae77ac83a031178})
                    .then(function(contactID) {
                        console.log('updated a contact',1009)
                        //res.json({status:'success',Id:contactID,ImageID:file._id});
                    })