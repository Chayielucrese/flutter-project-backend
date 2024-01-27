const jwt = require("jsonwebtoken");
const Secret =
  process.env.Secret || "kadkashdharihkfewur8r9erriashfkhdfufuihifhaihifuh";
const link_expireIn = "12h";

module.exports = {
  generateTokenForUSer(userId) {

    const token = jwt.sign({ _id: userId }, Secret, {
      expiresIn: link_expireIn,
    });
    return  token;
  },

  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace("bearer " + "") : null;
  },
  
 
};