// AUTH CHECK

if(!localStorage.getItem("token")){

    window.location = "login.html";
}

if(localStorage.getItem("role") !== "ADMIN"){

    window.location = "dashboard.html";
}

// WELCOME

document.getElementById("welcome").innerText =
"Welcome " + localStorage.getItem("name") + " 🚀";

// NAVIGATION

function goDashboard(){

    window.location = "admin.html";
}

function goToAll(){

    window.location = "admin-complaints.html";
}

function goToUsers(){

    window.location = "manage-users.html";
}

function logout(){

    localStorage.clear();

    showToast("Logged out successfully");

    setTimeout(()=>{

        window.location = "login.html";

    },1000);
}

// THEME

function toggleTheme(){

    document.body.classList.toggle("light");
}

// TOAST

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(()=>{

        toast.style.display = "none";

    },3000);
}

// COUNTER ANIMATION

function animateValue(id,start,end,duration){

    let obj = document.getElementById(id);

    let range = end-start;

    let current = start;

    let increment = end>start ? 1 : -1;

    let stepTime = Math.abs(Math.floor(duration/range));

    let timer = setInterval(()=>{

        current += increment;

        obj.innerText = current;

        if(current == end){

            clearInterval(timer);
        }

    },stepTime);
}

// LOAD DASHBOARD

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

    animateValue("total",0,data.totalComplaints,1000);

    animateValue("open",0,data.openComplaints,1000);

    animateValue("resolved",0,data.resolvedComplaints,1000);

    document.getElementById("users").innerText = 24;

    loadCharts(data);

    loadRecentComplaints();

    hideLoader();

    showToast("Dashboard Loaded 🚀");
}

// CHARTS

function loadCharts(data){

    new Chart(document.getElementById("pieChart"), {

    type:"doughnut",

    data:{

        labels:["Open","Resolved"],

        datasets:[{

            data:[
                data.openComplaints,
                data.resolvedComplaints
            ],

            backgroundColor:[
                "#f59e0b",
                "#22c55e"
            ],

            borderWidth:0
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        cutout:"70%",

        plugins:{

            legend:{

                labels:{
                    color:"white"
                }
            }
        }
    }
});

   new Chart(document.getElementById("barChart"), {

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
                "#38bdf8",
                "#f59e0b",
                "#22c55e"
            ],

            borderRadius:10
        }]
    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        plugins:{

            legend:{
                labels:{
                    color:"white"
                }
            }
        },

        scales:{

            y:{
                ticks:{
                    color:"white"
                },

                grid:{
                    color:"rgba(255,255,255,0.1)"
                }
            },

            x:{
                ticks:{
                    color:"white"
                },

                grid:{
                    display:false
                }
            }
        }
    }
});
}

// RECENT COMPLAINTS

async function loadRecentComplaints(){

    let res = await fetch(

        "http://localhost:8080/api/complaints",

        {
            headers:{

                "Authorization":
                "Bearer " + localStorage.getItem("token")
            }
        }
    );

    let data = await res.json();

    let table = document.getElementById("recentTable");

    table.innerHTML = "";

    data.slice(0,5).forEach(c => {

        table.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.title}</td>
                <td>${c.status}</td>
            </tr>
        `;
    });
}
document.getElementById("profileName").innerText =
localStorage.getItem("name");

function toggleProfileMenu(){

    document
    .getElementById("profileDropdown")
    .classList.toggle("active");
}

function toggleNotifications(){

    document
    .getElementById("notificationDropdown")
    .classList.toggle("active");
}



/* THEME TOGGLE */

function toggleTheme(){

    document.body.classList.toggle("light-mode");

    // SAVE THEME
    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

    }else{

        localStorage.setItem("theme","dark");
    }
}

/* LOAD SAVED THEME */

window.addEventListener("DOMContentLoaded",()=>{

    const savedTheme =
    localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add("light-mode");
    }
});
// LOADER

function hideLoader(){

    document.getElementById("loader").style.display = "none";
}

// START

loadDashboard();

/* DASHBOARD SEARCH */

document
.getElementById("searchInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        let value =
        this.value.toLowerCase().trim();

        // DASHBOARD

        if(value.includes("dashboard")){

            window.location =
            "admin.html";
        }

        // COMPLAINTS

        else if(

            value.includes("complaint") ||

            value.includes("complaints")
        ){

            window.location =
            "admin-complaints.html";
        }

        // USERS

        else if(

            value.includes("user") ||

            value.includes("users")
        ){

            window.location =
            "manage-users.html";
        }

        // SETTINGS

        else if(

            value.includes("setting") ||

            value.includes("settings")
        ){

            showToast("⚙ Settings page coming soon");
        }

        // ANALYTICS

        else if(

            value.includes("analytics") ||

            value.includes("chart")
        ){

            window.scrollTo({

                top:500,

                behavior:"smooth"
            });
        }

        // UNKNOWN

        else{

            showToast("❌ No matching page found");
        }
    }
});
