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
    window.location = "all-complaints.html";
}

function logout(){
    localStorage.clear();
    alert("Logged out");
    window.location = "login.html";
}