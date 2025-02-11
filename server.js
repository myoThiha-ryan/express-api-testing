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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

// Query Params
app.get("/user", (req, res) => {
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

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const parsedId = parseInt(id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    res.status(501).send({ msg: "requested id not valid" });
  }
  const requestedUser = users.find((user) => user.id === parsedId);
  if (!requestedUser) {
    res.status(404).send({ msg: "there is no user with this Id" });
  }
  res.send(requestedUser);
});

app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
});
