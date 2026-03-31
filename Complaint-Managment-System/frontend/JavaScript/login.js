document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",   // 🔥 IMPORTANT
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
.then(data => {

    if (data.message === "Login Successful") {

        alert("Login Successful 🎉");

        // 🔥 ROLE BASED REDIRECT
        if (data.role === "ADMIN") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }

    } else {
        alert("Login Failed");
    }
})
.catch(error => {
    console.error(error);
    alert("Server Error ❌");
});
});