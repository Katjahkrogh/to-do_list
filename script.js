window.addEventListener("load", displayDate);

// Hent DOM-elementer ved hjælp af querySelector
const input = document.querySelector("#input"); // Inputfelt
const list = document.querySelector("#list_container"); // Henter den tomme list container
const btn = document.querySelector("#btn"); // Knappen til at tilføje opgaver
const done = document.querySelector("#done_container"); // Henter den tomme done container

// Tilknyt en eventlistener til knappen for at tilføje en opgave
btn.addEventListener("click", addTask);
document.querySelector(".doneBtn").addEventListener("click", showDoneList);
document.querySelector(".todoBtn").addEventListener("click", showToDoList);

// Tilknyt en eventlistener til opgavelisten for at markere eller fjerne opgaver
list.addEventListener("click", taskDone);
done.addEventListener("click", taskDone);

// Generere dato
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").textContent =
    date[2] + ". " + date[1] + " " + date[3];

  document.querySelector(".todoBtn").classList.add("activeBtn");
  document.querySelector(".doneBtn").classList.add("inActiveBtn");
}

// Funktion til at oprette et nyt listeelement med en given tekst
function createListItem(taskText) {
  const li = document.createElement("li"); // Opret et <li> element
  li.textContent = taskText; // Sæt teksten for <li> elementet

  const span = document.createElement("span"); // Opret et <span> element
  span.textContent = "\u00d7"; // Sæt indholdet af <span> til et kryds (X)

  li.appendChild(span); // Tilføj <span> til <li> elementet
  return li; // Returnér det oprettede <li> element
}

// Funktion til at tilføje en opgave til listen
function addTask() {
  if (input.value === "") {
    alert("You must write a task"); // Vis en advarsel, hvis inputfeltet er tomt
  } else {
    const li = createListItem(input.value); // Opret et nyt <li> element med inputteksten
    list.appendChild(li); // Tilføj <li> elementet til opgavelisten
    input.value = ""; // Nulstil inputfeltet efter tilføjelse af opgaven
  }
  saveData();
}

// Funktion til at markere eller fjerne en opgave fra listen
function taskDone(evt) {
  const target = evt.target; // Gem den klikkede element i variabelen "target"
  if (target.tagName === "LI") {
    target.classList.toggle("checked"); // Tilføj eller fjern klassen "checked" for at markere eller afmarkere opgaven
    saveData();

    // Flytter checked li til done listen med påsat timer
    if (target.classList.contains("checked")) {
      setTimeout(() => {
        done.appendChild(target);
      }, 300);
      saveData();
    } else {
      // Flytter li elementet tilbage, hvis check fjernes med påsat timer
      setTimeout(() => {
        list.appendChild(target);
      }, 300);
      saveData();
    }
  } else if (target.tagName === "SPAN") {
    const confirmation = confirm(
      "Er du sikker på, at du vil slette denne opgave?"
    ); // Vis en bekræftelsesdialog, hvor brugeren har mulighed for at fortryde eller bekræfte sletningen
    if (confirmation) {
      target.parentElement.remove(); // Fjern det overordnede <li> element, når der klikkes på <span>
      saveData();
    }
  }
}

// Funktion der gemmer de skrevne tasks lokalt på brugerens computer
function saveData() {
  localStorage.setItem("data", list.innerHTML);
  localStorage.setItem("data-done", done.innerHTML);
}

// Funktion der viser det gemte data, når browseren reloader eller linket åbnes på ny
function showData() {
  list.innerHTML = localStorage.getItem("data");
  done.innerHTML = localStorage.getItem("data-done");
}

// Kalder funktionen showdata
showData();

function showDoneList() {
  document.querySelector(".done").classList.remove("hidden");
  document.querySelector(".to-do").classList.add("hidden");

  document.querySelector(".todoBtn").classList.remove("activeBtn");
  document.querySelector(".doneBtn").classList.add("activeBtn");
  document.querySelector(".todoBtn").classList.add("inActiveBtn");
}

function showToDoList() {
  document.querySelector(".to-do").classList.remove("hidden");
  document.querySelector(".done").classList.add("hidden");

  document.querySelector(".doneBtn").classList.remove("activeBtn");
  document.querySelector(".todoBtn").classList.add("activeBtn");
  document.querySelector(".todoBtn").classList.add("inActiveBtn");
}
