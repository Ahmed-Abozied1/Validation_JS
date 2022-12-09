const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
  submit();
});
const submit = () => {
  const formdata = new FormData(form);

  const data = Object.fromEntries(formdata);
  fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  localStorage.setItem("data", data.email);
};
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("succes");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(String(email).toLowerCase());
};
const isValidUsername = (username) => {
  const regex = new RegExp("^[A-Za-z][A-Za-z0-9_]{5,15}[a-zA-Z]");
  return regex.test(String(username).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "username is required");
  } else if (!isValidUsername(usernameValue)) {
    setError(username, "Username must be a valid ");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "email must be a valid email");
  } else {
    setSuccess(email);
  }
  if (passwordValue === "") {
    setError(password, "password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "password must be at least 8 characters");
  } else {
    setSuccess(password);
  }
  if (password2Value === "") {
    setError(password2, "pleaser confirm your password");
  } else if (passwordValue !== password2Value) {
    setError(password2, "password not  match !");
  } else {
    setSuccess(password2);
    window.location.assign("../LoggedInPage//LoggedInPage.html");
  }
};
