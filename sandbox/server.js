import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.json({
    message: "Sandbox API healthy"
  });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});