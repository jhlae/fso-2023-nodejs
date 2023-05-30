const express = require("express");
const app = express();
app.use(express.json());

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

  if (!res.json(body)) {
    return res.status(400).json({
      error: "person is missing",
    });
  }

  const person = {
    name: res.json(body.name),
    number: res.json(body.number),
    id: generateRandId(),
  };

  persons = persons.concat(person);
  res.json(person);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
