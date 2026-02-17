// ================== DATABASE INIT ==================
if (!localStorage.getItem("users")) {
    const defaultUsers = [
        {username:"Admin", password:hash("admin@123"), role:"admin", reminder:10},
        {username:"Faculty", password:hash("faculty@123"), role:"faculty", reminder:10}
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

let currentUser = null;
let logoutTimer;

// ================== HASH FUNCTION ==================
function hash(text){
    return btoa(text); // simple base64 for demo (replace with SHA-256 later)
}

// ================== LOGIN ==================
function login(){
    const u = username.value;
    const p = hash(password.value);

    const users = JSON.parse(localStorage.getItem("users"));
    const found = users.find(x=>x.username===u && x.password===p);

    if(found){
        currentUser = found;
        sessionStorage.setItem("session", u);
        startApp();
    }else{
        alert("Invalid Login");
    }
}

// ================== START APP ==================
function startApp(){
    loginSection.classList.add("hidden");
    mainApp.classList.remove("hidden");

    if(currentUser.role !== "admin"){
        adminBtn.style.display="none";
    }

    buildTimetable();
    startReminderEngine();
    resetLogoutTimer();
}

// ================== LOGOUT ==================
function logout(){
    sessionStorage.clear();
    location.reload();
}

// ================== VIEW SWITCH ==================
function showView(view){
    document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
    document.getElementById(view+"View").classList.remove("hidden");
}

// ================== CREATE USER ==================
function createUser(){
    const u = newUser.value;
    const p = hash(newPass.value);

    const users = JSON.parse(localStorage.getItem("users"));
    users.push({username:u,password:p,role:"faculty",reminder:10});
    localStorage.setItem("users", JSON.stringify(users));

    alert("User Created");
}

// ================== TIMETABLE ==================
function buildTimetable(){
    const grid = document.getElementById("timetableGrid");
    grid.innerHTML="";

    const days=["Mon","Tue","Wed","Thu","Fri","Sat"];

    days.forEach(day=>{
        const row=document.createElement("div");
        row.innerHTML=`<strong>${day}</strong> | Period 1 | Period 2 | Period 3 | Period 4 | Period 5 | Period 6`;
        grid.appendChild(row);
    });
}

// ================== REMINDER ENGINE ==================
function startReminderEngine(){
    setInterval(()=>{
        const now=new Date();
        countdown.innerText=now.toLocaleTimeString();
    },1000);
}

// ================== SETTINGS ==================
function saveReminder(){
    currentUser.reminder = reminderInput.value;
    alert("Saved");
}

function changeTheme(){
    document.body.className=themeSelect.value;
}

function changePassword(){
    const newPass=prompt("New Password");
    if(newPass){
        currentUser.password=hash(newPass);
        alert("Changed");
    }
}

// ================== AUTO LOGOUT ==================
function resetLogoutTimer(){
    clearTimeout(logoutTimer);
    logoutTimer=setTimeout(()=>{
        alert("Session Expired");
        logout();
    }, 15*60*1000);
}

document.onmousemove=resetLogoutTimer;
document.onkeypress=resetLogoutTimer;

// ================== PWA ==================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
