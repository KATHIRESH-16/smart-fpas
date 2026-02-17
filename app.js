// ================= INITIALIZE DEFAULT USERS =================
function hash(text){
    return btoa(text);
}

function initializeUsers(){
    if(!localStorage.getItem("users")){
        const users=[
            {username:"Admin",password:hash("admin@123"),role:"admin",reminder:10},
            {username:"Faculty",password:hash("faculty@123"),role:"faculty",reminder:10}
        ];
        localStorage.setItem("users",JSON.stringify(users));
    }
}
initializeUsers();

let currentUser=null;
let correctCaptcha=0;
let logoutTimer;

// ================= CAPTCHA =================
function generateCaptcha(){
    const a=Math.floor(Math.random()*10)+1;
    const b=Math.floor(Math.random()*10)+1;
    correctCaptcha=a+b;
    document.getElementById("captchaQuestion").innerText=`What is ${a} + ${b}?`;
}
generateCaptcha();

// ================= PASSWORD TOGGLE =================
function togglePassword(){
    const input=document.getElementById("passwordInput");
    input.type=input.type==="password"?"text":"password";
}

// ================= LOGIN =================
function login(){
    const username=document.getElementById("usernameSelect").value;
    const password=document.getElementById("passwordInput").value;
    const captcha=parseInt(document.getElementById("captchaAnswer").value);

    if(captcha!==correctCaptcha){
        alert("Captcha Incorrect");
        generateCaptcha();
        return;
    }

    const users=JSON.parse(localStorage.getItem("users"));
    const user=users.find(u=>u.username===username && u.password===hash(password));

    if(!user){
        alert("Invalid Password");
        generateCaptcha();
        return;
    }

    currentUser=user;
    sessionStorage.setItem("sessionUser",user.username);

    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");

    if(user.role!=="admin"){
        document.getElementById("adminBtn").style.display="none";
    }

    startClock();
    resetTimer();
}

// ================= AUTO LOGIN =================
window.onload=function(){
    const session=sessionStorage.getItem("sessionUser");
    if(session){
        const users=JSON.parse(localStorage.getItem("users"));
        const user=users.find(u=>u.username===session);
        if(user){
            currentUser=user;
            document.getElementById("loginSection").classList.add("hidden");
            document.getElementById("mainApp").classList.remove("hidden");
            if(user.role!=="admin"){
                document.getElementById("adminBtn").style.display="none";
            }
            startClock();
            resetTimer();
        }
    }
}

// ================= LOGOUT =================
function logout(){
    sessionStorage.clear();
    location.reload();
}

// ================= VIEW SWITCH =================
function showView(view){
    document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
    document.getElementById(view+"View").classList.remove("hidden");
}

// ================= CREATE USER =================
function createUser(){
    const u=document.getElementById("newUser").value;
    const p=document.getElementById("newPass").value;
    if(!u || !p) return alert("Fill fields");

    const users=JSON.parse(localStorage.getItem("users"));
    users.push({username:u,password:hash(p),role:"faculty",reminder:10});
    localStorage.setItem("users",JSON.stringify(users));
    alert("User Created");
}

// ================= CLOCK =================
function startClock(){
    setInterval(()=>{
        document.getElementById("clock").innerText=new Date().toLocaleTimeString();
    },1000);
}

// ================= AUTO LOGOUT 15 MIN =================
function resetTimer(){
    clearTimeout(logoutTimer);
    logoutTimer=setTimeout(()=>{
        alert("Session Expired");
        logout();
    },15*60*1000);
}

document.onmousemove=resetTimer;
document.onkeypress=resetTimer;

// ================= SERVICE WORKER =================
if('serviceWorker' in navigator){
    navigator.serviceWorker.register("service-worker.js");
}
