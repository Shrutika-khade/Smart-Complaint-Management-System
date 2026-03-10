alert("JS file loaded");

function register(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let role=document.getElementById("role").value;

fetch("http://localhost:8080/api/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name:name,
email:email,
password:password,
role:role
})

})

.then(response => response.text())   // ← JSON nahi text

.then(data => {

alert(data);

window.location="login.html";

})

.catch(error=>{
console.error(error);
alert("Registration Failed");
});

}