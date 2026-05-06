const API = "http://localhost:8080/api/users";

// Load users
async function loadUsers() {
    let res = await fetch(API);
    let data = await res.json();

    let table = document.getElementById("userTable");
    table.innerHTML = "";

    data.forEach(u => {
        let row = `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    ${
                       u.role === "ADMIN"
                       ? `<span style="color:red;">Protected</span>`
                       : `<button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">Delete</button>`
                     }
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Delete user
async function deleteUser(id) {

    if(!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    alert("User deleted!");
    loadUsers();
}

loadUsers();