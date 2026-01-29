const express = require("express");
const app = express();

const tokenRoutes = require("./routes/tokenRoutes");
const { simulateDay } = require("./simulation/opdSimulation");

app.use(express.json());
app.use("/api/tokens", tokenRoutes);

// Simulation in browser
app.get("/simulate", (req, res) => {
  const result = simulateDay();
  res.send(`<pre>${result}</pre>`);
});

app.get("/", (req, res) => {
  res.send("OPD Token Allocation Engine is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
