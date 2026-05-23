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

        document.getElementById(
"rejectedComplaints"
).innerText =
data.rejectedComplaints;

       // OVERVIEW TOTAL

document.getElementById(
"overviewTotal"
).innerText =
data.totalComplaints;

document.getElementById(
"overviewTotalCount"
).innerText =
data.totalComplaints;
// OVERVIEW RESOLVED

document.getElementById(
"overviewResolved"
).innerText =
data.resolvedComplaints;

// OVERVIEW REJECTED

document.getElementById(
"overviewRejected"
).innerText =
data.rejectedComplaints;

// OVERVIEW PENDING

document.getElementById(
"overviewPending"
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

// ============================
// LOAD RECENT COMPLAINTS
// ============================

async function loadRecentComplaints(){

    try{

        let res = await fetch(

            "http://localhost:8080/api/complaints/my",

            {
                headers:{
                    "Authorization":
                    "Bearer " +
                    localStorage.getItem("token")
                }
            }
        );

        let complaints =
        await res.json();
        console.log(complaints);

        let container =
        document.getElementById(
        "recentComplaintsContainer"
        );

        container.innerHTML = "";

        // latest 3 complaints

        complaints
        .slice(0,3)
        .forEach(c => {

            let statusClass =
            c.status === "RESOLVED"
            ? "resolved-status"
            : c.status === "REJECTED"
            ? "rejected-status"
            : "pending-status";

            let statusText =
            c.status.charAt(0) +
            c.status.slice(1).toLowerCase();

            container.innerHTML += `

<div class="recent-item">

    <div class="recent-left">

        <div class="recent-icon blue-bg">

            <i class="fa-solid fa-file-lines"></i>

        </div>

        <div>

            <h4>
                ${c.title}
            </h4>

            <p>
                ${c.description}
            </p>

        </div>

    </div>

    <div class="recent-right">

    <div class="status-date">

        <span class="${statusClass}">

            ${
                c.status === "OPEN"
                ? "Pending"
                : statusText
            }

        </span>

        <span class="complaint-date">

            ${new Date(c.createdAt)
            .toLocaleDateString("en-GB",{
                day:"2-digit",
                month:"short",
                year:"numeric"
            })}

        </span>

    </div>

    <i class="fa-solid fa-angle-right arrow-icon"></i>

</div>

</div>
`;
        });

    }

    catch(error){

        console.log(
        "Recent Complaint Error:",
        error
        );
    }
}

// CALL

loadDashboard();


loadRecentComplaints();


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

