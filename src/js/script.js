const btnAddDay = document.querySelector("#addDay");
const form = document.querySelector("#form-habits");
const days = document.querySelector(".days");
const nlwSetup = new NLWSetup(form);

let pressed = false;
let startX = 0;

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

function mouseDownHandler(e) {
  pressed = true;
  startX = e.clientX;
  this.style.cursor = "grabbing";
}

function mouseUpHandler(e) {
  pressed = false;
  startX = 0;
  days.style.cursor = "grab";
}

function mouseMoveHandler(e) {
  if (!pressed) {
    return;
  }

  this.scrollLeft += startX - e.clientX;
}

// event handlers
btnAddDay.addEventListener("click", newDay);
form.addEventListener("change", saveForm);
days.addEventListener("mousedown", mouseDownHandler);
days.addEventListener("mousemove", mouseMoveHandler);
window.addEventListener("mouseup", mouseUpHandler);

// load page
nlwSetup.setData(data);
nlwSetup.load();
