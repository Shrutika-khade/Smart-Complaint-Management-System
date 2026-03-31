// 🔐 Check login
if(!localStorage.getItem("auth")){
    alert("Please login first ❌");
    window.location = "login.html";
}

// ➕ Create Complaint
function goToCreate(){
    window.location = "create-complaint.html";
}

// 📄 My Complaints
function goToMy(){
    window.location = "my-complaints.html";
}

// 👨‍💼 Admin Panel
function goToAdmin(){
    window.location = "admin.html";
}

// 🚪 Logout
function logout(){
    localStorage.removeItem("auth");
    alert("Logged out successfully");
    window.location = "login.html";
}