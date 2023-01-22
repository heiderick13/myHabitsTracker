const btnAddDay = document.querySelector("#addDay");
const form = document.querySelector("#form-habits");
const days = document.querySelector(".days");
const nlwSetup = new NLWSetup(form);

const data = JSON.parse(localStorage.getItem("Habits")) || {};

// functions
function getDay() {
  const date = new Date().toLocaleDateString("pt-br").slice(0, -5);
  return date;
}

function newDay() {
  const today = getDay();
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    alert("Você já adicionou o dia de hoje");
  }

  nlwSetup.addDay(today);
}

function saveForm() {
  localStorage.setItem("Habits", JSON.stringify(nlwSetup.data));
}

// event handlers
btnAddDay.addEventListener("click", newDay);
form.addEventListener("change", saveForm);

// load page
nlwSetup.setData(data);
nlwSetup.load();
