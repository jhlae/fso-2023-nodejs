const mongoose = require("mongoose");

const password = process.argv[2];
const personName = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://joonaheinila:${password}@fso2023-cluster.yoshhvg.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  personName: String,
  phoneNumber: String,
});

const PhonebookEntry = mongoose.model("PhonebookEntry", phoneBookSchema);

const entry = new PhonebookEntry({
  personName: personName,
  phoneNumber: phoneNumber,
});

if (process.argv.length < 4) {
  console.log("phonebook:");
  PhonebookEntry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry.personName + " " + entry.phoneNumber);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  entry.save().then((result) => {
    console.log(
      "added " + personName + " number " + phoneNumber + " to phonebook."
    );
    mongoose.connection.close();
  });
}
