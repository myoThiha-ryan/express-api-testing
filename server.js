import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
});
