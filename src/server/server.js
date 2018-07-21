// Set up
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/FinoVision');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ limit:'50mb','extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit:'50mb'}));                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Member = mongoose.model('Members', {
    memberId: String,
    memberName: String,
    contactNumber: Number,
    accountnumber: Number,
    bankBranch: String,
    ifscCode: String,
    phonePayNumner: Number,
    chequeNumber: Number,
    emailAddress: String,
    profilePic: String,
    isAdmin: Boolean
});

// Routes

// Get members
app.get('/api/members', function (req, res) {

    console.log("fetching members");

    // use mongoose to get all members in the database
    Member.find(function (err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(reviews); // return all members in JSON format
    });
});

// create member and send back all members after creation
app.post('/api/members', function (req, res) {

    console.log("adding member");

    // create a member, information comes from request from Ionic
    Member.create({
        memberId: req.body.memberId,
        memberName: req.body.memberName,
        contactNumber: req.body.contactNumber,
        accountnumber: req.body.accountnumber,
        bankBranch: req.body.bankBranch,
        ifscCode: req.body.ifscCode,
        phonePayNumner: req.body.phonePayNumner,
        chequeNumber: req.body.chequeNumber,
        emailAddress: req.body.emailAddress,
        isAdmin: req.body.isAdmin,
        profilePic: req.body.profilePic
    }, function (err, Member) {
        if (err)
            res.send(err);

        // get and return all the members after you create another
        Member.find(function (err, members) {
            if (err)
                res.send(err)
            res.json(members);
        });
    });

});

// delete a review
app.put('/api/members', function (req, res) {

   console.log("updating member...");
    // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    Member.findByIdAndUpdate(
        // the id of the item to find
        req.body._id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
});



// // delete a member
// app.delete('/api/reviews/:review_id', function(req, res) {
//     Review.remove({
//         _id : req.params.review_id
//     }, function(err, review) {

//     });
// });


// listen (start app with node server.js) ======================================
app.listen(27017);
console.log("App listening on port 27017");

