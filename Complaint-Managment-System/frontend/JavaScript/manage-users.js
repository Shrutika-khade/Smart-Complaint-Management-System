const API = "https://smart-complaint-management-system-8qyp.onrender.com/api/users";

let allUsers = [];

/* LOAD USERS */

async function loadUsers(){

    let res = await fetch(API,{
        headers:{
            "Authorization":
            "Bearer " + localStorage.getItem("token")
        }
    });

    let data = await res.json();

    allUsers = data;

    renderUsers(data);
}

/* RENDER */

function renderUsers(data){

    let table =
    document.getElementById("userTable");

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

                        ? `<span style="color:red">
                           Protected
                           </span>`

                        : `<button onclick="deleteUser(${u.id})">
                           Delete
                           </button>`
                    }
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

/* SEARCH */

document.getElementById("userSearch")
.addEventListener("keyup", function(){

    let value =
    this.value.toLowerCase();

    let filtered =
    allUsers.filter(u =>

        u.name.toLowerCase().includes(value) ||

        u.email.toLowerCase().includes(value) ||

        u.role.toLowerCase().includes(value)
    );

    renderUsers(filtered);
});

/* DELETE */

async function deleteUser(id){

    if(!confirm("Delete user?")) return;

    await fetch(`${API}/${id}`,{

        method:"DELETE",

        headers:{
            "Authorization":
            "Bearer " + localStorage.getItem("token")
        }
    });

    loadUsers();
}

loadUsers();