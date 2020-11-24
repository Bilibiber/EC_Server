const JWT = require('jsonwebtoken');
const User = require('../model/userModel');

module.exports = function (req, res, next) {
  // check if the token in req
  const token = req.Cookies.auth_token;
  if (!token) return res.status(401).send('Access denied');

  // verify token
  try {
    const verified = JWT.verify(token, process.env.token_salt);
    console.log(verified);
    // once verified we refresh the token
    // if (verified) {
    //   const tokenClaim = JWT.decode(token, process.env.token_salt);
    //   const newToken = JWT.sign(
    //     {id: tokenClaim._id, name: tokenClaim.name},
    //     process.env.token_salt,
    //     {expiresIn: 60 * 5}
    //   );
    //   res.cookie('auth_token', newToken, {httpOnly: true}).send();
    // }
  } catch (err) {
    res.status(401).send('InValid_Token');
  }
};
