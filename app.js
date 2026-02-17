// ================= HASH FUNCTION =================
function hash(text) {
    return btoa(text);
}

// ================= INITIALIZE USERS =================
function initializeUsers() {
    if (!localStorage.getItem("users")) {
        const users = [
            { username: "Admin", password: hash("admin@123"), role: "admin" },
            { username: "Faculty", password: hash("faculty@123"), role: "faculty" }
        ];
        localStorage.setItem("users", JSON.stringify(users));
    }
}
initializeUsers();

// ================= CAPTCHA =================
let correctCaptcha = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctCaptcha = num1 + num2;

    const label = document.getElementById("captchaQuestion");
    label.innerText = `What is ${num1} + ${num2}?`;
}

// Run captcha after page loads
window.onload = function () {
    generateCaptcha();
};

// ================= PASSWORD TOGGLE =================
function togglePassword() {
    const input = document.getElementById("passwordInput");

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// ================= LOGIN =================
function login() {

    const username = document.getElementById("usernameSelect").value;
    const password = document.getElementById("passwordInput").value;
    const captcha = parseInt(document.getElementById("captchaAnswer").value);

    if (captcha !== correctCaptcha) {
        alert("Captcha is incorrect!");
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
