var User = require('../models/user');
var Chatroom = require('../models/chatroom');
var data;

function findItem(arr, prop, val) {
    var i;
    for (i in arr) {
        if (arr[i][prop] == val) {
          console.log("found");
            return 1;
        }
    }
    return 0;
}

module.exports =  function(app, passport){

    // Access third-party User
    app.get('/userprofile', isLoggedIn, function(req, res) {

        var quer = req.query.id;

        //get user information based on the id url parameter
        User.findById(quer, function(err, userDat) {
                res.render('pages/main/user-profile', {
                    user: userDat
                });
        });

    });

  app.get('/getmentors', function (req, res) {
        specialtyList = req.query;
        var mentors = User.find({
            $and: [{
                specialty: {
                    $in: specialtyList.specialty
                }
            }, {
                role: "mentor"
            }]
        }).limit(10);
        mentors.exec(function (err, data) {
            if (err) return err;
            res.send(data);
        });
    });

  app.post('/addmentors', function(req, res){
      //if already contacts, return err;
      User.findOne({_id: req.user._id},function(err, m_user){

        if (err) {
            // TODO: handle error
        } else {
          callback1(m_user);

        }
      });

      function callback1(m_user) {
        exist = findItem(m_user.contacts, "id", req.query.id);
        if(exist){
          console.log("already exist");
          res.send("Already added!");
        }else{
          User.findOne({_id : req.query.id},function(err, mentor){
            if (err) {
                // TODO: handle error
            } else {
              callback2(m_user,mentor);
            }
          });
          res.send("Add successfully!");
        }
      }

      function callback2(m_user,mentor) {
        var newChatRoom = {
            "speaker1_id": m_user._id,
            "speaker2_id": mentor._id,
            "room_id": "",
            "chatlog": []
        }
        CharRoom.collection.insert(newChatRoom,function(err, result) {
            if (err) {
              console.log(err);
            } else {
              var room_id = result.insertedIds[0];
              callback3(m_user,mentor,room_id );
            }
        });
      }

      function callback3(m_user,mentor,room_id ) {
        mentor_data={
                    "name" : mentor.givenname + " " + mentor.familyname,
                    "pic" :  mentor.profilePicture,
                    "id" : mentor._id,
                    "relation" : "mentor",
                    "room_id" : room_id
        };

        mentee_data={
                    "name" : m_user.givenname + " " + m_user.familyname,
                    "pic" :  m_user.profilePicture,
                    "id" : m_user._id,
                    "relation" : "mentee",
                    "room_id" : room_id
        };

        User.update(
            {"_id": m_user._id},
            { "$push":
                {"contacts":
                    mentor_data
                }
            }, function(err, updated) {
              if( err || !updated ) {
                    console.log("Contact is not added");
                }
              else {
                    console.log("Mentee New contact is added");
                }
        });

        User.update(
            {"_id": mentor._id},
            { "$push":
                {"contacts":
                    mentee_data
                }
            }, function(err, updated) {
              if( err || !updated ) {
                    console.log("Contact is not added");
                }
              else {
                    console.log("Mentor New contact is added");
                }
        });

      }
    });




};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}