import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import passport from "passport";
import User from "../models/user.model.js";

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.use(
  "login",
  new Strategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("Usuario no encontrado!");
        return done(null, false);
      }
      if (!isValidPassword(username, password)) {
        console.log("Invalid password");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "signup",
  new Strategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (user) {
          console.log("El usuario existe!");
          return done(null, false);
        }
        const newUser = {
          username,
          password: createHash(password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          direction: req.body.direction,
          age: req.body.age,
          phone: req.body.phone,
          photo: req.body.photo,
        };

        User.create(newUser, (err, user) => {
          if (err) return done(err);
          logger.info("Usuario creado");
          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

export default passport;
