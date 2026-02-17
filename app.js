/* =========================
   FORCE CLEAN OLD STORAGE
========================= */
if (!localStorage.getItem("FPAS_VERSION")) {
    localStorage.clear();
    localStorage.setItem("FPAS_VERSION", "v5");
}

/* =========================
   DEFAULT USERS
========================= */
if (!localStorage.getItem("users")) {
    const defaultUsers = {
        "Admin": "admin@123",
        "Faculty": "faculty@123"
    };
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

/* =========================
   CAPTCHA
========================= */
let num1 = Math.floor(Math.random() * 10);
let num2 = Math.floor(Math.random() * 10);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("captchaQuestion").innerText =
        `What is ${num1} + ${num2}?`;
});

/* =========================
   TOGGLE PASSWORD
========================= */
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

/* =========================
   LOGIN
========================= */
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

    // SUCCESS
    localStorage.setItem("loggedInUser", username);

    error.style.color = "green";
    error.innerText = "Login successful... Redirecting";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 800);
}
