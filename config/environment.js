const development = {
  mongopassword: process.env.DB_PASSWORD_KEY,
  mongousername: process.env.DB_USER_NAME,
  jwtsecretkey: process.env.JWT_SECRET_KEY
};
const production = {
  mongopassword: process.env.DB_PASSWORD_KEY,
  mongousername: process.env.DB_USER_NAME,
  jwtsecretkey: process.env.JWT_SECRET_KEY
};
module.exports = { development, production };
