// ============================
// LOGIN CHECK
// ============================

if(!localStorage.getItem("token")){

    window.location =
    "login.html";
}


// ============================
// USER NAME
// ============================

document.getElementById(
"welcomeText"
).innerText =
`Welcome back, ${
localStorage.getItem("name")
}! 👋`;


// ============================
// LOAD DASHBOARD
// ============================

async function loadDashboard(){

    try{

        let res = await fetch(

            "http://localhost:8080/api/complaints/dashboard",

            {
                headers:{
                    "Authorization":
                    "Bearer " +
                    localStorage.getItem("token")
                }
            }
        );

        let data =
        await res.json();

        console.log(data);

        // TOTAL

        document.getElementById(
        "totalComplaints"
        ).innerText =
        data.totalComplaints;

        // RESOLVED

        document.getElementById(
        "resolvedComplaints"
        ).innerText =
        data.resolvedComplaints;

        // OPEN / PENDING

        document.getElementById(
        "pendingComplaints"
        ).innerText =
        data.openComplaints;

    }

    catch(error){

        console.log(
        "Dashboard Error:",
        error
        );
    }
}


// CALL

loadDashboard();


// ============================
// NAVIGATION
// ============================

function goToCreate(){

    window.location =
    "create-complaint.html";
}


function goToMy(){

    window.location =
    "user-complaints.html";
}


// ============================
// LOGOUT
// ============================

function logout(){

    localStorage.clear();

    alert("Logged out");

    window.location =
    "login.html";
}