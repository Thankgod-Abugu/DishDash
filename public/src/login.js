// CHECKBOX PASSWORD TOGGLE
const password = document.querySelector("#password");
const passwordCheckbox = document.querySelector("#password-checkbox");

function togglePassword() {
  if (passwordCheckbox.checked) {
    password.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
  }
}
passwordCheckbox.addEventListener("change", togglePassword);

// FORM VALIDATION
const loginForm = document.querySelector("form");

function validateForm() {
  // Flag to track overall validity
  let isValid = true;

  // --- 1. USERNAME VALIDATION ---
  const userName = document.getElementById("username");
  const userNameRegEx = /^[A-Za-z]{3,20}$/;
  const userNameErr = document.getElementById("username-err");

  // Username  validation conditioners
  if (userName.value === "") {
    userName.classList.add("red-border");
    userNameErr.textContent = "username cannot be empty";
    isValid = false;
  } else if (userName.value.includes(" ")) {
    userName.classList.add("red-border");
    userNameErr.textContent = "username cannot contain spaces";
    isValid = false;
  } else if (!userNameRegEx.test(userName.value)) {
    userName.classList.add("red-border");
    userNameErr.textContent =
      "username invalid, use 3 - 20 characters of a-z or A-Z only";
    isValid = false;
  } else {
    userName.classList.remove("red-border");
    userNameErr.textContent = "";
  }

  // --- 2. PASSWORD VALIDATION ---
  const password = document.getElementById("password");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const passwordErr = document.getElementById("password-err");

  // password validation conditioners
  if (password.value === "") {
    password.classList.add("red-border");
    passwordErr.textContent = "password cannot be empty";
    isValid = false;
  } else if (password.value.includes(" ")) {
    password.classList.add("red-border");
    passwordErr.textContent = "password cannot contain spaces";
    isValid = false;
  } else if (password.value.length < 8 || password.value.length > 16) {
    password.classList.add("red-border");
    passwordErr.textContent = "password must be between 8 to 16 characters";
    isValid = false;
  } else if (!passwordRegex.test(password.value)) {
    password.classList.add("red-border");
    passwordErr.textContent = "Password must contain (a-z, A-Z and number)";
    isValid = false;
  } else {
    password.classList.remove("red-border");
    passwordErr.textContent = "";
  }

  // Return the final validation status
  return isValid;
}

// SUBMIT HANDLER
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // wait 2s before loading main web page
  if (validateForm()) {
    setTimeout(() => {
    loginForm.submit();
  }, 1500);
  }
});