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

// const generateRandId = () => {
//   const maxID =
//     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
//   return maxID + 1;
// };

// Get all entries from db
app.get("/api/persons", (req, res) => {
  PhonebookEntry.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = new PhonebookEntry({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedEntry) => {
    res.json(savedEntry);
  });
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
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
