const development = {
  mongopassword: process.env.DB_PASSWORD_KEY,
};
const production = {
  mongopassword: process.env.DB_PASSWORD_KEY,
};
module.exports = { development, production };
