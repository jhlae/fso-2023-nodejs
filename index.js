const express = require("express");
var morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World :)</h1>");
});

/* 
Operations for phonebook
*/

app.get("/api/persons", (req, res) => {
  persons ? res.json(persons) : res.status(404).end();
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

const generateRandId = () => {
  const maxID =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxID + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "person is missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandId(),
  };

  const checkDuplicate = persons.find((p) => p.name === person.name);
  // console.log(checkDuplicate);
  if (checkDuplicate) {
    return res.status(400).json({
      error: "name must be unique",
    });
  } else {
    persons = persons.concat(person);
  }

  res.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
