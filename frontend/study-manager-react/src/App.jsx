import React, { useState } from "react";

function App() {
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState("");
  const [schedule, setSchedule] = useState([]);

  const generateSchedule = () => {
    const subjectArray = subjects.split(",").map(s => s.trim()).filter(Boolean);
    if (subjectArray.length === 0 || !hours) return;

    const perSubjectTime = (hours / subjectArray.length).toFixed(1);

    const result = subjectArray.map(subject => ({
      name: subject,
      time: perSubjectTime + " hours"
    }));

    setSchedule(result);
  };

  return (
    <div style={styles.container}>
      <h1>AI Powered Study Time Manager</h1>
      <p>Generate a smart daily study schedule</p>

      <input
        type="text"
        placeholder="Enter subjects (comma separated)"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Total study hours per day"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        style={styles.input}
      />

      <button onClick={generateSchedule} style={styles.button}>
        Generate Schedule
      </button>

      <h2>Your Study Schedule</h2>

      <ul style={styles.list}>
        {schedule.map((item, index) => (
          <li key={index}>
            {item.name} – {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    padding: "20px"
  },
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    marginTop: "10px",
    padding: "10px 25px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px",
    textAlign: "center"
  }
};

export default App;
