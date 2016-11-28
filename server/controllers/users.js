var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
	login: function(req, res) {
    if(!req.body.email) return res.send({status: 'fail', error: 'no_email_in_body'});
			User.findOne({email: req.body.email}, function(err, existingUser){
        if(!existingUser){
          User.create(req.body, function(err, user){
            req.session.name = user.first_name;
            req.session.userId = user._id;
            req.session.picUrl = user.picture;
            req.session.phone = user.phone;
            req.session.email = user.email;
            req.session.save()
            res.redirect('/email/'+ user.email)
          })
        }else{
					req.session.name = existingUser.first_name;
					req.session.userId = existingUser._id;
          req.session.picUrl = existingUser.picture;
          req.session.phone = existingUser.phone;
          req.session.email = existingUser.email;
          req.session.save() 
          return res.send({status: 'success'});
        }
			}); 
	},
   index : function(req, res) {
    User.find(function(err, users) {
      if (err) return res.send(err);
      res.send(users);
    });
  },
  getOneUser: function(req, res){
    User.findOne({_id : req.body.id})
      .populate('_joinedEvents _ratings')
        .exec(function(err, user){
          if(err){
            console.log(err)
          }else {
            res.send(user)
          }
      })
  },
  getSession : function(req, res){
    if(req.session.name=== undefined){
      res.json({status:'failed', user: {name: null, userId: null}})
    }else{
      res.json({status: 'successdd', user: {name: req.session.name, userId: req.session.userId, pic: req.session.picUrl, phone: req.session.phone, email: req.session.email}})
    }
  },
  logout: function(req,res){
    req.session.destroy()
    res.redirect('/')
  },
  update: function(req,res){
    User.findOne({email:req.body.email},function(err, user){
      user.phone = req.body.phone
      req.session.phone = user.phone
      user.first_name = req.body.name
      req.session.name = user.first_name
      user.save(function(err, user){
        if(err){
          res.json({status: 'failed'})
        }else{
          res.json({status: 'succes', user: user})
        }
      })
    }) 
  }
}