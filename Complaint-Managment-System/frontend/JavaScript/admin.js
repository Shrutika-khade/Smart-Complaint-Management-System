if(!localStorage.getItem("auth")){
    alert("Login first ❌");
    window.location = "login.html";
}

// ❌ USER KO ADMIN PAGE NA DO
if(localStorage.getItem("role") !== "ADMIN"){
    alert("Access Denied ❌");
    window.location = "dashboard.html";
}

document.getElementById("welcome").innerText =
"Admin Panel - " + localStorage.getItem("name");

function goToAll(){
    window.location = "admin-complaints.html";
}

function logout(){
    localStorage.clear();
    alert("Logged out");
    window.location = "login.html";
}
function goToUsers(){
    window.location = "manage-users.html";
}

// 🔥 DASHBOARD FUNCTION
async function loadDashboard() {
    let res = await fetch("http://localhost:8080/api/complaints/dashboard");
    let data = await res.json();

    document.getElementById("total").innerText = data.totalComplaints;
    document.getElementById("open").innerText = data.openComplaints;
    document.getElementById("resolved").innerText = data.resolvedComplaints;
}

// 🔥 CALL FUNCTION
loadDashboard();