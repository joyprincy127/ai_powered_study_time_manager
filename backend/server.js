const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test route to check backend
app.get("/", (req, res) => {
    res.send("AI Study Time Manager Backend is running");
});


// API to generate study plan
app.post("/generate-plan", (req, res) => {

    const { hours, subjects } = req.body;

    // Log request in terminal (for demo)
    console.log("Request received from frontend");
    console.log("Hours:", hours);
    console.log("Subjects:", subjects);

    if (!hours || !subjects) {
        return res.json({ error: "Invalid data" });
    }

    const subjectsArray = subjects.split(",");

    const hoursPerSubject = Math.round((hours / subjectsArray.length) * 2) / 2;

    let plan = [];

    subjectsArray.forEach(sub => {
        plan.push({
            subject: sub.trim(),
            time: hoursPerSubject
        });
    });

    // Send result back to frontend
    res.json(plan);
});


// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});