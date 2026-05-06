if (!localStorage.getItem("auth")) {
    alert("Login first ❌");
    window.location = "login.html";
}

// ADMIN को redirect करो
if (localStorage.getItem("role") === "ADMIN") {
    window.location = "admin.html";
}

// Welcome text
const name = localStorage.getItem("name");
document.getElementById("welcome").innerText =
    "Welcome " + name + " 🚀";

// Navigation
function goToCreate() {
    window.location = "create-complaint.html";
}

function goToMy() {
    window.location = "user-complaints.html"; // ✅ updated
}

function logout() {
    localStorage.clear();
    alert("Logged out");
    window.location = "login.html";
}