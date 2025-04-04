// Check if the user is already logged in by checking sessionStorage
if (sessionStorage.getItem("userLoggedIn")) {
  window.location.replace("landing.html");  // Redirect to the main page if logged in
}


// Prevent the default form submission
document.getElementById("login_form").addEventListener("submit", function (event) {
  event.preventDefault();


  // Creating login Id and Password variables to store and check values
  const loginID = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;



  // Check if the credentials are correct
  if (loginID === "" || loginPassword === "" || loginID !== "admin@admin.com" || loginPassword !== "admin") {
    alert("Incorrect User Name or Password");
  } else {

    // Correct credentials: set sessionStorage and redirect to main page
    sessionStorage.setItem("userLoggedIn", "true");
    window.location.replace("landing.html");

  }
})