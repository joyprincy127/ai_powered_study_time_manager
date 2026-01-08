// small welcome popup
function showIntro() {
    alert("This AI-inspired tool helps you divide your study hours smartly based on exam urgency.");
}

// random motivational messages
var motivationMessages = [
    "Small study sessions every day create big results ",
    "Your future self will thank you for the effort you put in today ",
    "Don’t study harder, study smarter ",
    "Focus on one thing at a time. You’ve got this! "
];

// make sure DOM is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    var randomIndex = Math.floor(Math.random() * motivationMessages.length);
    var msgElement = document.getElementById("motivationText");
    if (msgElement) {
        msgElement.innerText = motivationMessages[randomIndex];
    }
});

function generatePlan() {
    var hours = parseFloat(document.getElementById("hoursInput").value);
    var daysLeft = parseInt(document.getElementById("daysInput").value);
    var focus = document.getElementById("focusInput").value;
    focus = focus.trim().toLowerCase();

    if (isNaN(hours) || isNaN(daysLeft) || hours <= 0) {
        alert("Please enter valid values for hours and days.");
        return;
    }

    // Determine urgency level
    var urgencyText = "";
    if (daysLeft <= 1) {
        urgencyText = "High urgency: Exam is very close!";
    } else if (daysLeft <= 5) {
        urgencyText = " Medium urgency: Exam is coming soon.";
    } else {
        urgencyText = " Low urgency: You still have enough days.";
    }
    document.getElementById("urgencyText").innerText = urgencyText;

    // Subjects with base weights (Math, Programming, Theory)
    var mathWeight, codeWeight, theoryWeight;

    if (daysLeft <= 1) {
        // last minute -> focus more on tough subjects
        mathWeight = 0.45;
        codeWeight = 0.35;
        theoryWeight = 0.20;
    } else if (daysLeft <= 5) {
        mathWeight = 0.40;
        codeWeight = 0.35;
        theoryWeight = 0.25;
    } else {
        // long time before exam -> balance, more reading
        mathWeight = 0.35;
        codeWeight = 0.30;
        theoryWeight = 0.35;
    }

    // Adjust weights slightly based on focus keyword
    if (focus.indexOf("math") !== -1 || focus.indexOf("quant") !== -1) {
        mathWeight += 0.10;
        codeWeight -= 0.05;
        theoryWeight -= 0.05;
    } else if (
        focus.indexOf("code") !== -1 ||
        focus.indexOf("program") !== -1 ||
        focus.indexOf("coding") !== -1
    ) {
        codeWeight += 0.10;
        mathWeight -= 0.05;
        theoryWeight -= 0.05;
    } else if (
        focus.indexOf("theory") !== -1 ||
        focus.indexOf("reading") !== -1
    ) {
        theoryWeight += 0.10;
        mathWeight -= 0.05;
        codeWeight -= 0.05;
    }

    // Normalize weights to sum to 1
    var totalWeight = mathWeight + codeWeight + theoryWeight;
    mathWeight = mathWeight / totalWeight;
    codeWeight = codeWeight / totalWeight;
    theoryWeight = theoryWeight / totalWeight;

    // calculate hours for each subject
    var mathHours = roundToHalf(hours * mathWeight);
    var codeHours = roundToHalf(hours * codeWeight);
    var theoryHours = roundToHalf(hours * theoryWeight);

    // Inject plan into list
    var planList = document.getElementById("planList");
    planList.innerHTML = ""; // clear previous

    var items = [
        "Math / Quantitative: " + mathHours + " hour(s)",
        "Programming / Coding: " + codeHours + " hour(s)",
        "Theory / Reading: " + theoryHours + " hour(s)"
    ];

    for (var i = 0; i < items.length; i++) {
        var li = document.createElement("li");
        li.textContent = items[i];
        planList.appendChild(li);
    }

    // Estimate preparation score (fake AI score)
    var prepScore = calculatePrepScore(hours, daysLeft);
    document.getElementById("progressBar").style.width = prepScore + "%";
    document.getElementById("progressPercent").innerText = prepScore + "%";

    // AI-style message
    var aiMessage = "";
    if (prepScore < 40) {
        aiMessage = "Your preparation is starting. Try to add at least 1–2 more hours today if possible.";
    } else if (prepScore < 70) {
        aiMessage = "Good progress! Stay consistent and revise key topics daily.";
    } else {
        aiMessage = "Great job! Focus on revision, past papers and quick recap sessions.";
    }
    document.getElementById("aiMessage").innerText = aiMessage;
}

// helper: round number to nearest 0.5
function roundToHalf(num) {
    return Math.round(num * 2) / 2;
}

// helper: generate a simple AI-like preparation score
function calculatePrepScore(hours, daysLeft) {
    // basic idea: more hours & fewer days -> higher urgency and score
    var base = hours * 10;

    if (daysLeft <= 1) {
        base += 20;
    } else if (daysLeft <= 5) {
        base += 10;
    } else {
        base += 5;
    }

    if (base > 100) {
        base = 100;
    }
    if (base < 0) {
        base = 0;
    }

    return Math.round(base);
}