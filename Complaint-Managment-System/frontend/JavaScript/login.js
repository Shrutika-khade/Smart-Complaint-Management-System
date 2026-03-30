document.getElementById("loginForm").addEventListener("submit", function(event){

event.preventDefault();

console.log("Login clicked");

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

console.log(email, password);

let base64Credentials = btoa(email + ":" + password);

fetch("http://localhost:8080/api/complaints", {

    method: "GET",

    headers: {
        "Authorization": "Basic " + base64Credentials
    }

})
.then(response => {

    console.log("Response status:", response.status);

    if(response.ok){

        alert("Login Successful 🎉");

        localStorage.setItem("auth", base64Credentials);

        window.location = "dashboard.html";

    } else {

        alert("Invalid email or password ❌");

    }

})
.catch(error => {

    console.error(error);
    alert("Server Error ❌");

});

});