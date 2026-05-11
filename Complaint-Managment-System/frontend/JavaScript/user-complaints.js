// ============================
// API URL
// ============================

const API_URL =
"http://localhost:8080/api/complaints";


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
"userName"
).innerText =
localStorage.getItem("name");


// ============================
// LOAD COMPLAINTS
// ============================

async function loadComplaints(){

    try{

        const response =
        await fetch(API_URL, {

            headers:{

                "Authorization":
                "Bearer " +
                localStorage.getItem("token")
            }
        });

        const data =
        await response.json();

        console.log(data);

        // MAIN CONTAINER

        const container =
        document.getElementById(
        "complaintContainer"
        );

        container.innerHTML = "";

        // LOOP

        data.forEach(c => {

            // STATUS COLOR

            let statusClass =
            "pending";

            if(c.status === "RESOLVED"){

                statusClass =
                "resolved";
            }

            // PRIORITY COLOR

            let priorityClass =
            "low";

            if(c.priority === "HIGH"){

                priorityClass =
                "high";
            }

            else if(
            c.priority === "MEDIUM"
            ){

                priorityClass =
                "medium";
            }

            // CARD

            container.innerHTML += `

            <div class="complaint-card">

                <!-- LEFT -->

                <div class="card-left">

                    <div class="complaint-icon">

                        <i class="fa-solid fa-server"></i>

                    </div>

                    <div class="complaint-details">

                        <h2>
                            ${c.title}
                        </h2>

                        <p>
                            ${c.description}
                        </p>

                        <div class="meta">

                            <span>
                                ID:
                                #CMP${c.id}
                            </span>

                            <span>
                                ${c.department}
                            </span>

                        </div>

                    </div>

                </div>

                <!-- RIGHT -->

                <div class="card-right">

                    <div class=
                    "status ${statusClass}">

                        ${c.status}

                    </div>

                    <div class=
                    "priority ${priorityClass}">

                        ${c.priority}

                    </div>

                </div>

            </div>
            `;
        });

    }

    catch(error){

        console.log(
        "Error:",
        error
        );
    }
}


// ============================
// CALL FUNCTION
// ============================

loadComplaints();


// ============================
// LOGOUT
// ============================

function logout(){

    localStorage.clear();

    window.location =
    "login.html";
}