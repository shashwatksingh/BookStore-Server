const development = {
  mongopassword: process.env.DB_PASSWORD_KEY,
  mongousername: process.env.DB_USER_NAME
};
const production = {
  mongopassword: process.env.DB_PASSWORD_KEY,
  mongousername: process.env.DB_USER_NAME
};
module.exports = { development, production };
