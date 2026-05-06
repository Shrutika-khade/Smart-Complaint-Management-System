const API_URL = "http://localhost:8080/api/complaints";

async function loadComplaints() {

    const response = await fetch(API_URL);
    const data = await response.json();

    const container = document.getElementById("list");
    container.innerHTML = "";

    data.forEach(c => {

        let color = "green";

        if (c.priority === "HIGH") color = "red";
        else if (c.priority === "MEDIUM") color = "orange";

        const div = document.createElement("div");

        div.className = "card mb-3 p-3";

        div.innerHTML = `
            <h4>${c.title}</h4>
            <p>${c.description}</p>
            <p>Status: <b>${c.status}</b></p>
            <p style="color:${color}; font-weight:bold;">
                Priority: ${c.priority}
            </p>
        `;

        container.appendChild(div);
    });
}

loadComplaints();