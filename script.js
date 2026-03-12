const form = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");

const inputs = {
  firstName: document.getElementById("fname"),
  lastName: document.getElementById("lname"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  password: document.getElementById("userPass"),
  confirmPassword: document.getElementById("confirmPass"),
};

function getFirstNameError(value) {
  if (!value.trim()) return "First name is required";
  return null;
}

function getLastNameError(value) {
  if (!value.trim()) return "Last name is required";
  return null;
}

function getEmailError(value) {
  if (!value.trim()) return "Email is required";
  if (!inputs.email.validity.valid) return "Enter a valid email";
  return null;
}

function getPhoneError(value) {
  const pattern = /^[0-9]{10,15}$/;
  if (!value) return "Phone number is required";
  if (!pattern.test(value)) return "Enter a valid phone number";
  return null;
}

function getPasswordError(value) {
  if (!value) return "Password is required";
  return null;
}

function getConfirmPasswordError(value, passwordValue) {
  if (!value) return "Enter password again to confirm";
  if (value !== passwordValue) return "Passwords do not match";
  return null;
}

const strength = document.getElementById("strength");

function passwordStrength() {
  const value = inputs.password.value;

  let score = 0;

  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const levels = ["Weak", "Fair", "Good", "Strong"];

  strength.textContent = value
    ? `Strength: ${levels[score - 1] || "Weak"}`
    : "";
}

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
  input.classList.add("invalid");
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = "";
  input.classList.remove("invalid");
}

function validate(input) {
  let error = null;

  if (input === inputs.firstName) {
    error = getFirstNameError(input.value);
  } else if (input === inputs.lastName) {
    error = getLastNameError(input.value);
  } else if (input === inputs.email) {
    error = getEmailError(input.value);
  } else if (input === inputs.phone) {
    error = getPhoneError(input.value);
  } else if (input === inputs.password) {
    error = getPasswordError(input.value);
  } else if (input === inputs.confirmPassword) {
    error = getConfirmPasswordError(input.value, inputs.password.value);
  }

  if (error) {
    showError(input, error);
    return false;
  }

  clearError(input);
  return true;
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("blur", () => {
    validate(input);
  });

  input.addEventListener("input", () => {
    clearError(input);
    if (input === inputs.password) passwordStrength();
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const valid = Object.values(inputs).every((input) => validate(input));
  if (valid) {
    console.log("Form submitted");
  }
});
