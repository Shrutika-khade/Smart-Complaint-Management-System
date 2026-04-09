if(!localStorage.getItem("auth")){
    alert("Login first ❌");
    window.location = "login.html";
}

// ❌ ADMIN KO YAHAN NA AANE DO
if(localStorage.getItem("role") === "ADMIN"){
    window.location = "admin.html";
}

document.getElementById("welcome").innerText =
"Welcome " + localStorage.getItem("name") + " 🚀";

function goToCreate(){
    window.location = "create-complaint.html";
}

function goToMy(){
    window.location = "my-complaints.html";
}

function logout(){
    localStorage.clear();
    alert("Logged out");
    window.location = "login.html";
}