const API = "http://localhost:8080/api/complaints";

// Load all complaints
async function loadComplaints() {
    let res = await fetch(API);
    let data = await res.json();

    let table = document.getElementById("complaintTable");
    table.innerHTML = "";

    data.forEach(c => {
        let row = `
            <tr>
                <td>${c.id}</td>
                <td>${c.title}</td>
                <td>${c.description}</td>
                <td style="color:${getColor(c.priority)}">${c.priority}</td>

                <!-- 🔥 STATUS COLOR ADDED -->
                <td style="color:${getStatusColor(c.status)}">
                    ${c.status}
                </td>

                <td>
                    ${
                        c.status === "OPEN"
                        ? `<button onclick="updateStatus(${c.id})">Mark Resolved</button>`
                        : `<span style="color:green;">✔ Done</span>`
                    }
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Priority color
function getColor(priority) {
    if (priority === "HIGH") return "red";
    if (priority === "MEDIUM") return "orange";
    return "green";
}

// 🔥 NEW FUNCTION (Status color)
function getStatusColor(status) {
    if (status === "OPEN") return "red";
    if (status === "RESOLVED") return "green";
}

// Update status
async function updateStatus(id) {
    await fetch(`${API}/${id}/status?status=RESOLVED`, {
        method: "PUT"
    });

    alert("Status Updated!");
    loadComplaints();
}

// Load on page open
loadComplaints();