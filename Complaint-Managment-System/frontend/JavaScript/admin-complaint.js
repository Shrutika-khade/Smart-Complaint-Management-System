const API = "http://localhost:8080/api/complaints";

let allComplaints = [];

/* LOAD COMPLAINTS */

async function loadComplaints() {

    let res = await fetch(API,{
        headers:{
            "Authorization":
            "Bearer " + localStorage.getItem("token")
        }
    });

    let data = await res.json();

    allComplaints = data;

    renderComplaints(data);
}

/* RENDER */

function renderComplaints(data){

    let table =
    document.getElementById("complaintTable");

    table.innerHTML = "";

    data.forEach(c => {

        let row = `
            <tr>
                <td>${c.id}</td>
                <td>${c.title}</td>
                <td>${c.description}</td>

                <td style="color:${getColor(c.priority)}">
                    ${c.priority}
                </td>

                <td style="color:${getStatusColor(c.status)}">
                    ${c.status}
                </td>

                <td>
                    ${
                        c.status === "OPEN"
                        ? `<button onclick="updateStatus(${c.id})">
                           Resolve
                           </button>`
                        : `<span style="color:lime">
                           ✔ Done
                           </span>`
                    }
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

/* SEARCH */

document.getElementById("complaintSearch")
.addEventListener("keyup", function(){

    let value =
    this.value.toLowerCase();

    let filtered =
    allComplaints.filter(c =>

        c.title.toLowerCase().includes(value) ||

        c.description.toLowerCase().includes(value) ||

        c.status.toLowerCase().includes(value)
    );

    renderComplaints(filtered);
});

/* COLORS */

function getColor(priority){

    if(priority === "HIGH") return "red";

    if(priority === "MEDIUM") return "orange";

    return "lime";
}

function getStatusColor(status){

    if(status === "OPEN") return "orange";

    return "lime";
}

/* UPDATE */

async function updateStatus(id){

    await fetch(`${API}/${id}/status?status=RESOLVED`,{

        method:"PUT",

        headers:{
            "Authorization":
            "Bearer " + localStorage.getItem("token")
        }
    });

    loadComplaints();
}

loadComplaints();