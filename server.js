import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, name: "Myo", age: 21 },
  { id: 2, name: "Nanm", age: 21 },
  { id: 3, name: "James", age: 21 },
  { id: 4, name: "Sarah", age: 21 },
  { id: 5, name: "Tony", age: 21 },
  { id: 6, name: "Simon", age: 21 },
];

const loggingMiddleware = (req, res, next) => {
  console.log(req.method + " - " + req.url);
  next();
};

const resolveIndexByUserId = (req, res, next) => {
  const {
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
  req.userIndex = userIndex;
  next();
};

app.use(express.json());
app.use(loggingMiddleware);

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

app.get("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { userIndex } = req;
  const requestedUser = users[userIndex];
  res.send(requestedUser);
});

// POST Request

app.post("/api/user", (req, res) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  res.status(201).send(newUser);
});

// PUT request

app.put("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { userIndex, body } = req;
  users[userIndex] = { id: users[userIndex].id, ...body };
  res.sendStatus(204);
});

// PATCH request

app.patch("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { userIndex, body } = req;
  users[userIndex] = { ...users[userIndex], ...body }; // way of updating with PATCH request
  res.sendStatus(204);
});

// DElETE request

app.delete("/api/user/:id", resolveIndexByUserId, (req, res) => {
  const { userIndex } = req;
  users.splice(userIndex, 1);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
});
