const LocalStrategy = require('passport-local').Strategy
const mongoose      = require('mongoose')
const bcrypt        = require('bcrypt')

// load user
const User = require('../models/User')


module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' } , ( email , password , done ) => {
            // match the user
            User.findOne({ email : email})
                .then(user => {
                    if(!user){
                        return done( null , false  , { massage : 'Email does not exist'})
                    }

                    bcrypt.compare(password, user.password , ( error , isMatch ) => {
                        
                        if(error) throw error
                        
                        if(isMatch){
                            return done( null , user )
                        }
                        else {
                            return done( null , false , { massage : 'Password is incorect'})
                        }
                    }) 

                })
                .catch( error  => console.log(error))
        })
    )


    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}