document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const base64Credentials = btoa(email + ":" + password);

    fetch("http://localhost:8080/api/complaints", {
    method: "GET",
    headers: {
        "Authorization": "Basic " + base64Credentials
    }
    })
    .then(response => {
        if (response.ok) {
             localStorage.setItem("auth", base64Credentials);
             window.location.href = "dashboard.html";
        } else {
            errorMsg.innerText = "Invalid email or password!";
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById("errorMsg").innerText = "Server error!";
    });
});