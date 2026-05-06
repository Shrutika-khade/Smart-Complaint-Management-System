const API_URL = "http://localhost:8080/api/complaints";

// 🔥 Page Load
document.addEventListener("DOMContentLoaded", () => {

    loadDepartments(); // dropdown load

    const form = document.getElementById("complaintForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const departmentId = document.getElementById("department").value;

        // ⚠️ Validation
        if (!departmentId) {
            alert("⚠️ Please select department");
            return;
        }

        const data = {
            title: title,
            description: description,
            department: {
                id: parseInt(departmentId)
            }
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("✅ Complaint Submitted!");
                form.reset();
            } else {
                alert("❌ Failed to submit complaint");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("⚠️ Server error");
        }
    });

});


// 🔥 Load Departments in Dropdown
async function loadDepartments() {
    try {
        let res = await fetch("http://localhost:8080/api/departments");
        let data = await res.json();

        let dropdown = document.getElementById("department");

        dropdown.innerHTML = `<option value="">Select Department</option>`;

        data.forEach(d => {
            dropdown.innerHTML += `<option value="${d.id}">${d.name}</option>`;
        });

    } catch (error) {
        console.error("Department load error:", error);
    }
}