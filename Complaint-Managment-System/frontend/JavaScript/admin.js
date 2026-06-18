if(!localStorage.getItem("token")){

    window.location = "login.html";
}

// NAME

document.getElementById("adminName")
.innerText = localStorage.getItem("name");

// NAVIGATION

function goToComplaints(){

    window.location =
    "admin-complaints.html";
}

function goToUsers(){

    window.location =
    "manage-users.html";
}

// THEME

function toggleTheme(){

    document.body.classList.toggle("light-mode");
}

// DASHBOARD DATA

async function loadDashboard(){

    let res = await fetch(
        "https://smart-complaint-management-system-8qyp.onrender.com/api/complaints/admin-dashboard",

        {
            headers:{
                "Authorization":
                "Bearer " + localStorage.getItem("token")
            }
        }
    );

    let data = await res.json();

    document.getElementById("total")
    .innerText = data.totalComplaints;

    document.getElementById("open")
    .innerText = data.openComplaints;

    document.getElementById("resolved")
    .innerText = data.resolvedComplaints;
     
    // LOAD TOTAL USERS

let userRes = await fetch(
    "https://smart-complaint-management-system-8qyp.onrender.com/api/auth/total-users"
);

let totalUsers = await userRes.json();

document.getElementById("users")
.innerText = totalUsers;
    

// RANDOM GROWTH %

document.getElementById("totalGrowth")
.innerText =
"+" + (Math.floor(Math.random()*20)+1) + "%";

document.getElementById("openGrowth")
.innerText =
"+" + (Math.floor(Math.random()*15)+1) + "%";

document.getElementById("resolvedGrowth")
.innerText =
"+" + (Math.floor(Math.random()*25)+1) + "%";

document.getElementById("userGrowth")
.innerText =
"+" + (Math.floor(Math.random()*10)+1) + "%";

    loadCharts(data);

    
}

// CHARTS

function loadCharts(data){

   // TOTAL
let total =
data.openComplaints +
data.resolvedComplaints +
data.rejectedComplaints;
// CENTER TOTAL
document.getElementById("totalCount").innerText =
total;

// COUNTS
document.getElementById("openCount").innerText =
data.openComplaints;

document.getElementById("resolvedCount").innerText =
data.resolvedComplaints;

document.getElementById("rejectedCount").innerText =
data.rejectedComplaints;
// PERCENTAGES
let openPercent =
((data.openComplaints / total) * 100).toFixed(0);

let resolvedPercent =
((data.resolvedComplaints / total) * 100).toFixed(0);

let rejectedPercent =
((data.rejectedComplaints / total) * 100).toFixed(0);

document.getElementById("openPercent").innerText =
`(${openPercent}%)`;

document.getElementById("resolvedPercent").innerText =
`(${resolvedPercent}%)`;

document.getElementById("rejectedPercent").innerText =
`(${rejectedPercent}%)`;


    new Chart(document.getElementById("pieChart"),{

        type:"doughnut",

        data:{

            labels:["Open","Resolved", "Rejected"],

            datasets:[{

                data:[
                    data.openComplaints,
                    data.resolvedComplaints,
                    data.rejectedComplaints
                ],

                backgroundColor:[
                    "#ed7e0f",
                    "#0ea949",
                    "#ff4d4d"
                ],
                borderWidth:0,
            }]
        },
options:{

    responsive:true,

    maintainAspectRatio:false,

    cutout:'70%',

    plugins:{
        legend:{
            display:false
        }
    }
}
    });

    new Chart(document.getElementById("barChart"),{

        type:"bar",

        data:{

            labels:[
                "Total",
                "Open",
                "Resolved"
            ],

            datasets:[{

                label:"Complaints",

                data:[
                    data.totalComplaints,
                    data.openComplaints,
                    data.resolvedComplaints
                ],

                backgroundColor:[
                    "#2b8cff",
                    "orange",
                    "#2ee676"
                ],

                borderRadius:10
            }]
        },

        options:{
            responsive:true,
            maintainAspectRatio:false
        }
    });
}

loadDashboard();


// 🔥 LOAD LATEST COMPLAINTS
async function loadLatestComplaints() {

    try {

        let res = await fetch(
            "https://smart-complaint-management-system-8qyp.onrender.com/api/complaints",
            {
                headers: {
                    "Authorization":
                    "Bearer " + localStorage.getItem("token")
                }
            }
        );

        let data = await res.json();

        let table =
        document.getElementById("latestTable");

        table.innerHTML = "";

        // latest 5 complaints
        data.slice(-5).reverse().forEach(c => {

            let priorityColor = "#00ff88";

            if(c.priority === "HIGH")
                priorityColor = "#ff4d4d";

            else if(c.priority === "MEDIUM")
                priorityColor = "#ffb400";

            let statusColor =
                c.status === "OPEN"
                ? "#ff4d4d"
                : "#00ff88";

            table.innerHTML += `

            <tr>
                <td>#${c.id}</td>

                <td>${c.title}</td>

                <td style="
                    color:${priorityColor};
                    font-weight:bold;
                ">
                    ${c.priority}
                </td>

                <td style="
                    color:${statusColor};
                    font-weight:bold;
                ">
                    ${c.status}
                </td>
            </tr>

            `;
        });

    } catch(error) {

        console.error(
            "Latest complaint error:",
            error
        );
    }
}

loadLatestComplaints();

function toggleTheme(){

    document.body.classList.toggle("light-mode");
}

function logout(){

    localStorage.clear();

    window.location = "login.html";
}
