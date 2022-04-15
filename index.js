const express = require("express");
const persons = require("./data")

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/persons", (req, res) => {
    res.status(200).json(persons);
});


app.get("/api/persons/:id", (req, res) => {
    const person = persons.find((e) => e.id === Number(req.params.id));
    res.status(200).json(person);
});

app.post("/api/persons",  (req, res) => {
    const { name, location, age } = req.body;

    const lastId = persons[persons.length - 1].id;
    const newId = lastId + 1;

    const person = {
        id: newId,
        name: name,
        location: location,
        age: age,
    };

    persons.push(person);

    res.status(201).json(person)
});

app.put("/api/persons/:id", (req, res) => {
    const { name, location, age } = req.body;

    const indexPerson = persons.findIndex(
        (e) => e.id === Number(req.params.id)
    );

    persons[indexPerson] = {
        id: Number(req.params.id),
        name: name,
        location: location,
        age: age,
    };

    res.status(200).json(persons[indexPerson])
});

app.delete("/api/persons/:id", (req, res) => {
    const indexPerson = persons.findIndex(
        (e) => e.id === Number(req.params.id)
    );

    persons.splice(indexPerson, 1);

    res.status(200).json({
        message: `Artikel dengan ID ${req.params.id} telah dihapus`,
    });
});

app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`)
});