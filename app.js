// ================= HASH =================
function hash(text) {
    return btoa(text);
}

// ================= DEFAULT USERS =================
function initializeUsers() {
    if (!localStorage.getItem("users")) {
        const users = [
            { username: "Admin", password: hash("admin@123") },
            { username: "Faculty", password: hash("faculty@123") }
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
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

    generateCaptcha(); // INSTANT load

    // 👁 Eye Toggle
    document.getElementById("eyeBtn").addEventListener("click", function () {
        const passInput = document.getElementById("passwordInput");
        passInput.type = passInput.type === "password" ? "text" : "password";
    });

    // Login Button
    document.getElementById("loginBtn").addEventListener("click", login);

});

// ================= LOGIN =================
function login() {

    const username = document.getElementById("usernameSelect").value;
    const password = document.getElementById("passwordInput").value;
    const captcha = parseInt(document.getElementById("captchaAnswer").value);

    if (captcha !== correctCaptcha) {
        alert("Captcha Incorrect!");
        generateCaptcha();
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(u =>
        u.username === username &&
        u.password === hash(password)
    );

    if (!user) {
        alert("Invalid Password!");
        generateCaptcha();
        return;
    }

    alert("Login Successful!");
}
