const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: String,
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phoneBookSchema);

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PhonebookEntry", phoneBookSchema);
