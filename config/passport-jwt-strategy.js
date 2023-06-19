const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Admin = require("../models/admin");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ThisIsMySecret",
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
      let admin = await Admin.findById(jwtPayload._id);

      if (admin) {
        return done(null, admin);
      }

      return done(null, false);
    } catch (err) {
      console.log("Error in finding registered Admin");
      return;
    }
  })
);

module.exports = passport;
