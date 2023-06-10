const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const PhonebookEntry = require("./models/phonebookentry");
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World :)</h1>");
});

/* 
Operations for phonebook
*/

// Get all entries from db
app.get("/api/persons", (req, res, next) => {
  PhonebookEntry.find({}).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  PhonebookEntry.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new PhonebookEntry({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedEntry) => {
      res.json(savedEntry);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  var dateTime = new Date();
  res.send(
    "<p>Phonebook includes info for " +
      persons.length +
      " people. </p><p>" +
      dateTime
  );
});

morgan(function (tokens, req, res) {
  return [tokens.method(req, res),tokens.url(req, res),tokens.status(req, res),tokens.res(req, res, "content-length")," / ",tokens["response-time"](req, res),"ms",].join(" ");
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
