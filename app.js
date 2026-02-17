// ================= DEFAULT USERS (NO HASH - SIMPLE & SAFE) =================
function initializeUsers() {
    if (!localStorage.getItem("users")) {
        const users = [
            { username: "Admin", password: "admin@123" },
            { username: "Faculty", password: "faculty@123" }
        ];
        localStorage.setItem("users", JSON.stringify(users));
    }
}
initializeUsers();

// ================= CAPTCHA =================
let correctCaptcha = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    correctCaptcha = a + b;

    document.getElementById("captchaQuestion").innerText =
        `What is ${a} + ${b}?`;

    document.getElementById("captchaAnswer").value = "";
}

document.addEventListener("DOMContentLoaded", function () {

    generateCaptcha();

    // Eye Toggle
    document.getElementById("eyeBtn").addEventListener("click", function () {
        const passInput = document.getElementById("passwordInput");
        passInput.type = passInput.type === "password" ? "text" : "password";
    });

    // Login Button
    document.getElementById("loginBtn").addEventListener("click", login);

});

// ================= LOGIN =================
function login() {

    const errorBox = document.getElementById("errorMsg");
    errorBox.innerText = "";

    const username = document.getElementById("usernameSelect").value;
    const password = document.getElementById("passwordInput").value.trim();
    const captchaInput = document.getElementById("captchaAnswer").value.trim();

    if (!password) {
        errorBox.innerText = "Please enter password.";
        return;
    }

    if (!captchaInput) {
        errorBox.innerText = "Please solve the captcha.";
        return;
    }

    if (parseInt(captchaInput) !== correctCaptcha) {
        errorBox.innerText = "Captcha is incorrect.";
        generateCaptcha();
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
        errorBox.innerText = "Incorrect password.";
        generateCaptcha();
        return;
    }

    // SUCCESS
    errorBox.style.color = "#4ade80";
    errorBox.innerText = "Login successful!";

    setTimeout(() => {
        alert("Login Successful!");
    }, 500);
}
