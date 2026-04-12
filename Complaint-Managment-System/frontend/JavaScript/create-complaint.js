const API_URL = "http://localhost:8080/api/complaints";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("complaintForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const departmentId = document.getElementById("departmentId").value;

        const data = {
    title: title,
    description: description,
    department: {
        id: parseInt(departmentId)   // 🔥 IMPORTANT
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