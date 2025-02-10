import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, name: "Myo", age: 21 },
  { id: 2, name: "Nanm", age: 21 },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.get("/user", (req, res) => {
  res.send(users);
});

// Route Params

app.get("/users/:id", (req, res) => {
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
