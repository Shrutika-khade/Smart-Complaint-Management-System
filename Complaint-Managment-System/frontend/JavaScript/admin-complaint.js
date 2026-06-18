const API = "https://smart-complaint-management-system-8qyp.onrender.com/api/complaints";

let allComplaints = [];

/* LOAD COMPLAINTS */

async function loadComplaints() {

    let res = await fetch(API,{

        headers:{
            "Authorization":
            "Bearer " +
            localStorage.getItem("token")
        }
    });

    let data = await res.json();

    allComplaints = data;

    renderComplaints(data);
}

/* RENDER */

function renderComplaints(data){

    let table =
    document.getElementById(
    "complaintTable"
    );

    table.innerHTML = "";

    data.forEach(c => {

        let row = `

            <tr>

                <td>${c.id}</td>

                <td>${c.title}</td>

                <td>${c.description}</td>

                <td style="
                    color:${getColor(c.priority)};
                    font-weight:bold;
                ">
                    ${c.priority}
                </td>

                <td style="
                    color:${getStatusColor(c.status)};
                    font-weight:bold;
                ">
                    ${c.status}
                </td>

                <td>

                    ${
                        c.status === "OPEN"

                        ?

                        `

                        <button
                        class="resolve-btn"

                        onclick="updateStatus(
                        ${c.id},
                        'RESOLVED'
                        )">

                            Resolve

                        </button>

                        <button
                        class="reject-btn"

                        onclick="updateStatus(
                        ${c.id},
                        'REJECTED'
                        )">

                            Reject

                        </button>

                        `

                        :

                        c.status === "RESOLVED"

                        ?

                        `

                        <span style="
                        color:lime;
                        font-weight:bold;">

                            ✔ Resolved

                        </span>

                        `

                        :

                        `

                        <span style="
                        color:#ec4899;
                        font-weight:bold;">

                            ✖ Rejected

                        </span>

                        `
                    }

                </td>

            </tr>
        `;

        table.innerHTML += row;
    });
}

/* SEARCH */

document.getElementById(
"complaintSearch"
)

.addEventListener(
"keyup",

function(){

    let value =
    this.value.toLowerCase();

    let filtered =
    allComplaints.filter(c =>

        c.title
        .toLowerCase()
        .includes(value)

        ||

        c.description
        .toLowerCase()
        .includes(value)

        ||

        c.status
        .toLowerCase()
        .includes(value)
    );

    renderComplaints(filtered);
});

/* PRIORITY COLORS */

function getColor(priority){

    if(priority === "HIGH")
    return "red";

    if(priority === "MEDIUM")
    return "orange";

    return "lime";
}

/* STATUS COLORS */

function getStatusColor(status){

    if(status === "OPEN")
    return "orange";

    if(status === "REJECTED")
    return "#ec4899";

    return "lime";
}

/* UPDATE STATUS */

async function updateStatus(
    id,
    status
){

    await fetch(

        `${API}/${id}/status?status=${status}`,

        {

            method:"PUT",

            headers:{
                "Authorization":
                "Bearer " +
                localStorage.getItem("token")
            }
        }
    );

    loadComplaints();
}

/* INITIAL LOAD */

loadComplaints();