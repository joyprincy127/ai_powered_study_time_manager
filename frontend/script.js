function showPage(pageId){

var pages=document.querySelectorAll(".page");

pages.forEach(function(page){
page.style.display="none";
});

document.getElementById(pageId).style.display="block";

if(pageId==="profile"){
loadProfile();
}

if(pageId==="analytics"){
showAnalyticsMotivation();
}

}

showPage("home");



function showIntro(){

alert("This AI inspired tool helps you generate a smart study plan based on your available study hours.");

}



/* HOME MOTIVATION MESSAGES */

var motivationMessages=[

"Small study sessions every day create big results",
"Your future self will thank you for today's effort",
"Study smarter not harder",
"Focus on progress not perfection"

];

document.addEventListener("DOMContentLoaded",function(){

var randomIndex=Math.floor(Math.random()*motivationMessages.length);

var msg=document.getElementById("motivationText");

if(msg){
msg.innerText=motivationMessages[randomIndex];
}

});



/* ANALYTICS MOTIVATION MESSAGES */

var analyticsMessages=[

"Great job! Keep pushing your limits.",
"Consistency is the key to mastering any subject.",
"Small daily progress leads to big exam success.",
"Stay focused and keep improving your preparation."

];

function showAnalyticsMotivation(){

var randomIndex=Math.floor(Math.random()*analyticsMessages.length);

var msg=document.getElementById("analyticsMotivation");

if(msg){
msg.innerText=analyticsMessages[randomIndex];
}

}



/* GENERATE STUDY PLAN (FULL STACK VERSION) */

async function generatePlan(){

try{

var hours=document.getElementById("hoursInput").value;
var subjects=document.getElementById("subjectsInput").value;

if(!hours || !subjects){
alert("Please enter hours and subjects");
return;
}

const response = await fetch("http://localhost:3000/generate-plan",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
hours:parseFloat(hours),
subjects:subjects
})
});

const data = await response.json();

if(data.error){
alert(data.error);
return;
}

var planList=document.getElementById("planList");
planList.innerHTML="";

data.forEach(function(item){

var li=document.createElement("li");

var checkbox=document.createElement("input");
checkbox.type="checkbox";

li.appendChild(checkbox);
li.appendChild(document.createTextNode(" "+item.subject+" - "+item.time+" hours"));

planList.appendChild(li);

});

}catch(error){

console.log(error);
alert("Backend connection error. Make sure server is running.");

}

}



/* CALCULATE ANALYTICS */

function calculateAnalytics(){

var checkboxes=document.querySelectorAll("#planList input");

if(checkboxes.length===0){

document.getElementById("analyticsText").innerText="Generate a study plan first.";

document.getElementById("progressBar").style.width="0%";
document.getElementById("progressPercent").innerText="0%";

return;

}

var completed=0;

checkboxes.forEach(function(cb){

if(cb.checked) completed++;

});

var percent=Math.round((completed/checkboxes.length)*100);

document.getElementById("analyticsText").innerText="Your Study Completion: "+percent+"%";

document.getElementById("progressBar").style.width=percent+"%";
document.getElementById("progressPercent").innerText=percent+"%";

}



/* PROFILE SAVE */

function saveProfile(){

var name=document.getElementById("nameInput").value;
var standard=document.getElementById("standardInput").value;

localStorage.setItem("studentName",name);
localStorage.setItem("studentStandard",standard);

alert("Profile saved!");

}



/* PROFILE LOAD */

function loadProfile(){

var name=localStorage.getItem("studentName");
var standard=localStorage.getItem("studentStandard");

if(name){

document.getElementById("profileDisplay").innerText=
"Name: "+name+" | Standard: "+standard;

}

}