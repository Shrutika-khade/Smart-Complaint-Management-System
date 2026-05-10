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
        "http://localhost:8080/api/complaints/dashboard",

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

    loadCharts(data);
}

// CHARTS

function loadCharts(data){

    new Chart(document.getElementById("pieChart"),{

        type:"doughnut",

        data:{

            labels:["Open","Resolved"],

            datasets:[{

                data:[
                    data.openComplaints,
                    data.resolvedComplaints
                ],

                backgroundColor:[
                    "orange",
                    "#2ee676"
                ]
            }]
        },

        options:{
            responsive:true,
            maintainAspectRatio:false
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
            "http://localhost:8080/api/complaints",
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