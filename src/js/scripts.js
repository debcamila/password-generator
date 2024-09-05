function getId(length, uppercase, lowercase, numbers, symbols) {
  let result = "";
  let characters = "";
  if (uppercase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (lowercase) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  if (numbers) {
    characters += "1234567890";
  }
  if (symbols) {
    characters += "!@#$%^&*()_+[]{}|;:,.<>?";
  }
  if (characters === "") {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function generatorPassword() {
  const upperCaseLetters = document.getElementById("uppercase").checked;
  const lowerCaseLetters = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let passwordLength = document.getElementById("password-range");
  let newPassword = getId(
    passwordLength.value,
    upperCaseLetters,
    lowerCaseLetters,
    numbers,
    symbols
  );
  let passwordField = document.querySelector(".password_generator");
  passwordField.textContent = newPassword;

  calculatePasswordStrength(
    upperCaseLetters,
    lowerCaseLetters,
    numbers,
    symbols
  );
}

function calculatePasswordStrength(uppercase, lowercase, numbers, symbols) {
  const fill_strength = document.getElementsByClassName("fill_strength")[0];

  fill_strength.classList.remove(
    "strength_strong",
    "strength_average",
    "strength_weak"
  );
  if (uppercase && lowercase && numbers && symbols) {
    fill_strength.classList.add("strength_strong");
  } else if (uppercase && lowercase && (numbers || symbols)) {
    fill_strength.classList.add("strength_average");
  } else {
    fill_strength.classList.add("strength_weak");
  }
}

function showToast() {
  document.getElementById("toast").style.display = "flex";
  setTimeout(function () {
    document
      .getElementById("toast")
      .animate(
        [{ transform: "translateY(0px)" }, { transform: "translateY(-300px)" }],
        {
          duration: 3000,
          iterations: 1,
        }
      );
  }, 3000);
  setTimeout(function () {
    document.getElementById("toast").style.display = "none";
  }, 6000);
}

function copyToClipboard() {
  let passwordField = document.querySelector(".password_generator");
  navigator.clipboard.writeText(passwordField.textContent);
  showToast();
}

const refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", generatorPassword);

const copyIconButton = document.getElementById("copy");
copyIconButton.addEventListener("click", copyToClipboard);

const copyButtonBottom = document.getElementById("copy-bottom");
copyButtonBottom.addEventListener("click", copyToClipboard);

const customize_all = document.querySelectorAll("input");
customize_all.forEach(function (elem) {
  elem.addEventListener("input", generatorPassword);
});

var range = document.getElementById("password-range");
var field = document.getElementById("password-number");

range.addEventListener("input", function (e) {
  field.value = e.target.value;
});
field.addEventListener("input", function (e) {
  if (e.target.value > 24) {
    return e.preventDefault();
  }
  range.value = e.target.value;
});

generatorPassword();
