/* =====================
   INITIAL SETUP
===================== */
if (!localStorage.getItem("FPAS_VERSION")) {
    localStorage.clear();
    localStorage.setItem("FPAS_VERSION", "v6");
}

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify({
        "Admin": "admin@123",
        "Faculty": "faculty@123"
    }));
}

/* =====================
   CAPTCHA
===================== */
let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("captchaQuestion").innerText =
        `What is ${num1} + ${num2}?`;

    checkLogin();
});

/* =====================
   PASSWORD TOGGLE
===================== */
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

/* =====================
   LOGIN
===================== */
function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const captcha = document.getElementById("captchaAnswer").value;
    const error = document.getElementById("error");

    const users = JSON.parse(localStorage.getItem("users"));

    if (!password) {
        error.innerText = "Password required!";
        return;
    }

    if (parseInt(captcha) !== (num1 + num2)) {
        error.innerText = "Incorrect captcha!";
        return;
    }

    if (users[username] !== password) {
        error.innerText = "Invalid password!";
        return;
    }

    localStorage.setItem("loggedInUser", username);
    loadDashboard(username);
}

/* =====================
   LOAD DASHBOARD
===================== */
function loadDashboard(user) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.remove("hidden");
    document.getElementById("welcomeUser").innerText = "Logged in as: " + user;
}

/* =====================
   AUTO CHECK LOGIN
===================== */
function checkLogin() {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        loadDashboard(user);
    }
}

/* =====================
   LOGOUT
===================== */
function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}
