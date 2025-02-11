import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, name: "Myo", age: 21 },
  { id: 2, name: "Nanm", age: 21 },
  { id: 3, name: "James", age: 21 },
  { id: 4, name: "Sarah", age: 21 },
  { id: 5, name: "Tony", age: 21 },
  { id: 6, name: "Simon", age: 21 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

// Query Params
app.get("/api/user", (req, res) => {
  const {
    query: { filter, name },
  } = req;
  if (filter && name) {
    const filteredUsers = users.filter((user) => user[filter].includes(name));
    res.send(filteredUsers);
  }
  res.send(users);
});

// Route Params

app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const parsedId = parseInt(id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return res.status(501).send({ msg: "requested id not valid" });
  }
  const requestedUser = users.find((user) => user.id === parsedId);
  if (!requestedUser) {
    res.status(404).send({ msg: "there is no user with this Id" });
  }
  res.send(requestedUser);
});

// POST Request

app.post("/api/user", (req, res) => {
  const { body } = req;
  console.log(body);
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  res.status(201).send(newUser);
});

// PUT request

app.put("/api/user/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.sendStatus(404);
  }
  const userIndex = users.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) {
    return res.sendStatus(404);
  }
  users[userIndex] = { id: parsedId, ...body };
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
});
