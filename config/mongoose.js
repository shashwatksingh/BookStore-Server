const mongoose = require("mongoose");
const env = require('./environment');
const password = env.development.mongopassword;
mongoose.connect(`mongodb+srv://bookstoreuser:${password}@cluster0.lu11w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
//Listener to the event of the connection to the mongodb
db.once("open", () => {
  console.log("Connected to the MongoDB");
}).on("error", (err) => {
  console.log("Error: ", err);
});
