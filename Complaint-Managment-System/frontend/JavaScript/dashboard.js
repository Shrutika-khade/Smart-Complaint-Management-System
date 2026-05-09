if (!localStorage.getItem("token")) {

    alert("Login first ❌");

    window.location = "login.html";
}

// ADMIN redirect
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

    window.location = "user-complaints.html";
}

// Logout
function logout() {

    localStorage.clear();

    alert("Logged out");

    window.location = "login.html";
}