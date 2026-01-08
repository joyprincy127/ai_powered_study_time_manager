const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let studyRecords = [];

app.get("/", (req, res) => {
    res.send("AI Study Time Manager Backend is running");
});

app.post("/generate-plan", (req, res) => {
    const { hours, days, focus } = req.body;

    let urgency =
        days <= 2 ? "High" :
        days <= 5 ? "Medium" : "Low";

    let plan = {
        math: (hours * 0.4).toFixed(1),
        coding: (hours * 0.35).toFixed(1),
        theory: (hours * 0.25).toFixed(1)
    };

    studyRecords.push({ hours, days, focus, urgency, plan });

    res.json({
        message: "Study plan generated successfully",
        urgency,
        plan
    });
});

app.get("/plans", (req, res) => {
    res.json(studyRecords);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
